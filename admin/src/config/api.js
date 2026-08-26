// Centralized API configuration and asset formatters for Admin Panel

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Ensures PDF or file URL opens cleanly regardless of storage backend (Cloudinary, local uploads, or absolute URLs)
 */
export const formatPdfUrl = (fileUrl) => {
  if (!fileUrl) return "#";

  // If already absolute URL (e.g. Cloudinary: https://res.cloudinary.com/... or HTTP)
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
    return fileUrl;
  }

  // If relative path starting with /
  if (fileUrl.startsWith("/")) {
    return `${API_BASE_URL}${fileUrl}`;
  }

  // Fallback relative path
  return `${API_BASE_URL}/${fileUrl}`;
};
