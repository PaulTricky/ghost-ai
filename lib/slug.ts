/**
 * Turn a display name into a URL-safe slug (lowercase, hyphenated).
 */
export function slugFromDisplayName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
