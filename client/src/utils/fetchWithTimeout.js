/**
 * Fetches data with a timeout and proper caching headers
 * @param {string} url - The URL to fetch from
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 * @param {object} options - Additional fetch options
 * @returns {Promise} - Fetch response
 */
export const fetchWithTimeout = async (url, timeout = 10000, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - Server may be waking up from sleep. Please retry.');
    }
    throw error;
  }
};

/**
 * Fetches projects with proper error handling, timeout, and caching
 * @param {string} apiUrl - The API base URL
 * @returns {Promise<Array>} - Array of projects
 */
export const fetchProjects = async (apiUrl) => {
  const response = await fetchWithTimeout(`${apiUrl}/api/projects`, 10000);

  // Guard against HTML response
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Server returned HTML instead of JSON. The backend may be starting up.");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch projects (Status: ${response.status})`);
  }

  const jsonData = await response.json();
  
  // Handle both response formats: { success: true, data: [...] } or { data: [...] }
  return jsonData.success ? jsonData.data : (jsonData.data || []);
};

/**
 * Fetches a single project by slug with proper error handling, timeout, and caching
 * @param {string} apiUrl - The API base URL
 * @param {string} slug - The project slug
 * @returns {Promise<Object>} - Project object
 */
export const fetchProjectBySlug = async (apiUrl, slug) => {
  const cleanSlug = slug.trim();
  const response = await fetchWithTimeout(`${apiUrl}/api/projects/${cleanSlug}`, 10000);

  // Guard against HTML response
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Server returned HTML instead of JSON. The backend may be starting up.");
  }

  if (!response.ok) {
    throw new Error(`Project not found (Status: ${response.status})`);
  }

  const jsonData = await response.json();
  return jsonData.data;
};
