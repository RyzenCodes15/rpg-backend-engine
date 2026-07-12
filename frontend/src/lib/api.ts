import { getToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export interface ApiOptions extends RequestInit {
  textResponse?: boolean;
}

export const apiFetch = async (endpoint: string, options: ApiOptions = {}) => {
  const token = getToken();
  
  const headers = new Headers(options.headers);
  if (!options.body || typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(errorData?.error?.message || errorData?.title || errorData?.message || 'An API error occurred');
    } catch {
      throw new Error(errorText || 'An API error occurred');
    }
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  if (options.textResponse) {
    return text;
  }

  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === 'object' && 'success' in parsed && 'data' in parsed) {
      if (!parsed.success) {
        throw new Error(parsed.error?.message || 'An API error occurred');
      }
      return parsed.data;
    }
    return parsed;
  } catch (error) {
    if (error instanceof Error && error.message !== 'Invalid JSON response from server') {
      throw error;
    }
    console.error('Failed to parse JSON response:', text);
    throw new Error('Invalid JSON response from server');
  }
};
