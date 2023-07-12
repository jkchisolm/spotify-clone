export const sanitizeDescription = (description: string): string => {
  if (description.includes("</a>")) {
    // remove ONLY the anchor tags and keep the text inside
    description = description.replace(/<a\b[^>]*>(.*?)<\/a>/i, "$1");
    // remove hrefs
    description = description.replace(/href="(.*?)"/i, "");
  }

  const decoded = description.replace(/&#x([0-9a-f]+);/gi, (_, code) =>
    String.fromCharCode(parseInt(code, 16))
  );
  return decoded;
};
