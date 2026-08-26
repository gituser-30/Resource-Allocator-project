// Centralized API configuration and asset formatters for Client

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // If running locally on localhost or 127.0.0.1
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:5000";
  }
  // Production fallback for deployed website (e.g. Render / Netlify)
  return "https://resource-allocator-project.onrender.com";
};

export const API_BASE_URL = getBaseUrl();

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
