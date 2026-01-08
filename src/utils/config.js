// Central configuration for all environment variables
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
};

// Helper function to get full API URL
export const getApiUrl = (path = "") => {
  const baseUrl = config.apiBaseUrl;
  // Remove trailing slash from baseUrl and leading slash from path
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");
  return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
};
