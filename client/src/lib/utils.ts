export function stripHtmlAndTrim(html: string, maxLength = 200): string {
  if (!html) return "";

  // Remove HTML tags
  const plainText = html.replace(/<[^>]+>/g, "");

  // Decode HTML entities (optional if you use characters like &nbsp;)
  const decoded = plainText.replace(/&nbsp;/g, " ").trim();

  // Trim to desired length
  if (decoded.length > maxLength) {
    return decoded.slice(0, maxLength).trim() + "...";
  }

  return decoded;
}
