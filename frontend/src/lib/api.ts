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
      throw new Error(errorData?.title || errorData?.message || 'An API error occurred');
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
    return JSON.parse(text);
  } catch (error) {
    console.error('Failed to parse JSON response:', text);
    throw new Error('Invalid JSON response from server');
  }
};
