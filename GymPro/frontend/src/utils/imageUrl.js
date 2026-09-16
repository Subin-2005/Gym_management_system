import { BACKEND_URL } from "../services/api";

/**
 * Resolves full URL for images, fixing relative media paths and mixed-content issues.
 * @param {string|null|undefined} path - The image URL or media path.
 * @param {string} fallback - Fallback image path (e.g. "/default-user.png" or "/logo.jpeg").
 * @returns {string} - The resolved image URL.
 */
export function getImageUrl(path, fallback = "/default-user.png") {
    if (!path || typeof path !== "string" || path.trim() === "" || path === "null" || path === "undefined") {
        return fallback;
    }

    const trimmed = path.trim();

    // Data URLs or Blob URLs (e.g., from local file preview)
    if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
        return trimmed;
    }

    // Replace insecure http with https for render domain or if page is https
    if (trimmed.startsWith("http://gym-management-system-wwdi.onrender.com")) {
        return trimmed.replace(/^http:\/\//i, "https://");
    }

    // Absolute URLs
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        // If the current window is https, avoid mixed content for any onrender subdomains
        if (typeof window !== "undefined" && window.location.protocol === "https:" && trimmed.startsWith("http://")) {
            return trimmed.replace(/^http:\/\//i, "https://");
        }
        return trimmed;
    }

    // Relative media path (e.g., "/media/members/photo.jpg" or "media/members/photo.jpg")
    if (trimmed.startsWith("/media/") || trimmed.startsWith("media/")) {
        const cleanPath = trimmed.replace(/^\/+/, "");
        return `${BACKEND_URL}/${cleanPath}`;
    }

    // Local static/public assets (e.g. "/logo.jpeg")
    if (trimmed.startsWith("/")) {
        return trimmed;
    }

    // Any other relative path
    return `${BACKEND_URL}/${trimmed}`;
}

/**
 * Image onError handler to fallback to a default image without infinite loops.
 * @param {Event} e - Error event
 * @param {string} fallback - Fallback image path
 */
export function handleImageError(e, fallback = "/default-user.png") {
    if (e && e.currentTarget) {
        e.currentTarget.onerror = null;
        e.currentTarget.src = fallback;
    }
}
