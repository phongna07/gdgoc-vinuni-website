import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { imageSize } from "image-size";

import siteJson from "@/content/site.json";
import departmentsJson from "@/content/departments.json";
import timelineJson from "@/content/timeline.json";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const PUBLIC = path.join(ROOT, "public");

import type { Department, EventEntry, EventType, Article, Generation, Img, Milestone, Speaker } from "./types";
import { EVENT_TYPES } from "./types";

export * from "./types";

export const site = siteJson;
export const departments = departmentsJson as Department[];
export const timeline = timelineJson as Milestone[];

/* ---------- helpers ---------- */

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "").slice(0, 10);
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function formatMonth(yyyyMm: string): string {
  const d = new Date(`${yyyyMm}-01T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return yyyyMm;
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** Read an image under /public and return its intrinsic size. */
function readImage(src: string): Img | null {
  try {
    const buf = fs.readFileSync(path.join(PUBLIC, src));
    const { width, height } = imageSize(buf);
    if (!width || !height) return null;
    return { src, width, height };
  } catch {
    return null;
  }
}

/** Every image in /public/images/<kind>/<slug>/, sorted by file name. */
function folderImages(kind: string, slug: string): Img[] {
  const rel = `/images/${kind}/${slug}`;
  const dir = path.join(PUBLIC, rel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort()
    .map((f) => readImage(`${rel}/${f}`))
    .filter((i): i is Img => i !== null);
}

/** `cover` may be a file name inside the entry's image folder or a full /images/... path. */
function resolveCover(kind: string, slug: string, cover: unknown, fallback: Img[]): Img | null {
  if (typeof cover === "string" && cover) {
    const src = cover.startsWith("/") ? cover : `/images/${kind}/${slug}/${cover}`;
    const img = readImage(src);
    if (img) return img;
  }
  return fallback[0] ?? null;
}

function readMarkdownDir(dir: string) {
  const full = path.join(CONTENT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        data: data as Record<string, unknown>,
        html: marked.parse(content, { async: false }) as string,
      };
    });
}

/* ---------- events ---------- */

export function getEvents(): EventEntry[] {
  return readMarkdownDir("events")
    .map(({ slug, data, html }) => {
      const date = toIsoDate(data.date);
      const gallery = folderImages("events", slug);
      const type = (data.type as EventType) in EVENT_TYPES ? (data.type as EventType) : "community";
      return {
        slug,
        title: String(data.title ?? slug),
        date,
        dateLabel: data.dateLabel ? String(data.dateLabel) : formatDate(date),
        year: date.slice(0, 4),
        type,
        location: String(data.location ?? ""),
        summary: String(data.summary ?? ""),
        role: data.role ? String(data.role) : undefined,
        speakers: Array.isArray(data.speakers) ? (data.speakers as Speaker[]) : [],
        featured: Boolean(data.featured),
        cover: resolveCover("events", slug, data.cover, gallery),
        gallery,
        html,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEvent(slug: string): EventEntry | undefined {
  return getEvents().find((e) => e.slug === slug);
}

/* ---------- articles ---------- */

export function getArticles(): Article[] {
  return readMarkdownDir("articles")
    .map(({ slug, data, html }) => {
      const date = toIsoDate(data.date);
      return {
        slug,
        title: String(data.title ?? slug),
        date,
        dateLabel: formatDate(date),
        summary: String(data.summary ?? ""),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        cover: resolveCover("articles", slug, data.cover, folderImages("articles", slug)),
        html,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

/* ---------- team ---------- */

export function getGenerations(): Generation[] {
  const dir = path.join(CONTENT, "team");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Generation)
    .sort((a, b) => b.generation - a.generation);
}

/* ---------- photo wall ---------- */

export function getPhotoWall(): Img[] {
  const list = (site as { photoWall?: string[] }).photoWall ?? [];
  return list.map((src) => readImage(src)).filter((i): i is Img => i !== null);
}
