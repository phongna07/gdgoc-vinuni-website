import csv
import hashlib
import json
from pathlib import Path
from datetime import datetime, timezone
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent
posts = {}
errors = []
for path in sorted((ROOT / 'records').glob('*.json')):
    r = json.loads(path.read_text())
    if r.get('error'):
        errors.append(r)
        continue
    p = posts.setdefault(r['id'], dict(id=r['id'], url=r['url'], created=r['created'], caption='', images=[]))
    if len(r['caption']) > len(p['caption']):
        p['caption'] = r['caption']
    p['images'].append(r)

parent_captions_path = ROOT / 'parent-captions.json'
parent_captions = json.loads(parent_captions_path.read_text()) if parent_captions_path.exists() else {}
for post_id, captured in parent_captions.items():
    if post_id in posts and captured.get('caption'):
        posts[post_id]['caption'] = captured['caption']

rows = []
for p in sorted(posts.values(), key=lambda p: p['created'], reverse=True):
    date = datetime.fromtimestamp(p['created'], timezone.utc).strftime('%Y-%m-%d')
    folder = ROOT / 'posts' / (date + '_' + p['id'])
    folder.mkdir(parents=True, exist_ok=True)
    (folder / 'caption.txt').write_text(p['caption'], encoding='utf-8')
    (folder / 'source.txt').write_text(p['url'] + '\n', encoding='utf-8')
    files = []
    for r in p['images']:
        dest = folder / ('image_' + r['photo_id'] + '.jpg')
        entry = dict(photo_id=r['photo_id'], source=r['photo_url'], image_url=r['image']['uri'], width=r['image']['width'], height=r['image']['height'], file=dest.name)
        try:
            if not dest.exists():
                req = Request(r['image']['uri'], headers={'User-Agent': 'Mozilla/5.0'})
                with urlopen(req, timeout=40) as response:
                    data = response.read()
                if not data.startswith((b'\xff\xd8\xff', b'\x89PNG', b'RIFF')):
                    raise ValueError('Response is not an image')
                dest.write_bytes(data)
            entry.update(bytes=dest.stat().st_size, sha256=hashlib.sha256(dest.read_bytes()).hexdigest(), status='downloaded')
        except Exception as exc:
            entry.update(status='failed', error=str(exc))
            errors.append(entry)
        files.append(entry)
    metadata = dict(id=p['id'], source=p['url'], published_utc=datetime.fromtimestamp(p['created'], timezone.utc).isoformat(), caption=p['caption'], caption_status='captured' if p['caption'] else 'no caption exposed on photo page', images=files)
    (folder / 'metadata.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2), encoding='utf-8')
    rows.append(dict(date_utc=date, post_id=p['id'], title=p['caption'].split('\n')[0] if p['caption'] else '(no caption exposed)', image_count=len(files), downloaded=sum(f['status']=='downloaded' for f in files), caption_status=metadata['caption_status'], folder=str(folder.relative_to(ROOT)), source=p['url']))
with (ROOT / 'index.csv').open('w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['date_utc','post_id','title','image_count','downloaded','caption_status','folder','source'])
    writer.writeheader()
    writer.writerows(rows)
summary = dict(posts=len(rows), images=sum(r['image_count'] for r in rows), downloaded=sum(r['downloaded'] for r in rows), captions=sum(r['caption_status']=='captured' for r in rows), errors=errors)
(ROOT / 'summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(summary, ensure_ascii=False))
