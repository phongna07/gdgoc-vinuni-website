# GDGoC VinUniversity Facebook archive

Source: https://www.facebook.com/gdgoc.vinuni

Collected on 2026-11-14. Photo dates span 2023-09-21 through 2026-11-11 (UTC).

## Contents

- 160 downloaded images, organized into 71 post/photo folders.
- 66 entries with captured captions. Five profile/cover-photo entries expose no caption.
- `index.csv`: spreadsheet-friendly list of dates, titles, image counts, folders, caption status, and source URLs.
- `INDEX.md`: clickable list of folders and captions.
- `posts/YYYY-MM-DD_POST_ID/`: images, `caption.txt`, `source.txt`, and `metadata.json`.
- `metadata.json`: caption, source, publication/photo timestamp, image dimensions, download status, byte sizes, and SHA-256 hashes.
- `records/`: extracted photo records. `parent-captions.json` contains captions recovered from parent post pages.
- `summary.json`: counts and download errors.
- `organize.py`: recreates the folder layout and retries missing downloads using the collected records. Image URLs may expire.

## Coverage

This is an archive of the photo history accessible without logging in, not a verified export of every Facebook post. Facebook's logged-out timeline exposed only the latest post. The crawl followed every discovered older/newer photo link until no unvisited links remained, including the profile and cover-photo albums. Captions missing from album-photo pages were recovered from the corresponding parent post pages.

Text-only posts, video-only posts/Reels, deleted posts, restricted posts, and photos Facebook did not expose through these links may be absent. Videos and comments were not downloaded. A Facebook Page export or authorized logged-in access is needed to verify full post coverage.

Images use the resolution returned by Facebook's photo viewer; this is not a guarantee of original upload resolution. Captions preserve the available text, including existing shortened or incomplete links. Folder dates use UTC photo creation timestamps, which can differ from Facebook's local display date or an album's publication time.

All 160 image downloads succeeded. Empty caption files indicate that no caption was exposed, rather than a download error.
