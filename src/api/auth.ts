import {
  ApiError,
  getApiErrorMessage,
  INVALID_CREDENTIALS_MESSAGE,
} from '../lib/api-error';
import type { LoginResponse, MessageResponse } from '../types/auth';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';
const REQUEST_TIMEOUT_MS = 30_000;

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('Request timed out. Please try again.', 408);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const fallback =
      response.status === 401 || response.status === 403
        ? INVALID_CREDENTIALS_MESSAGE
        : 'Request failed. Please try again.';
    const message = await getApiErrorMessage(response, fallback);
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export function login(email: string, password: string): Promise<LoginResponse> {
  return postJson<LoginResponse>('/auth/login', { email, password });
}

export function requestPasswordReset(email: string): Promise<MessageResponse> {
  return postJson<MessageResponse>('/auth/forgot-password', { email });
}

export function resetPassword(
  token: string,
  newPassword: string,
): Promise<MessageResponse> {
  return postJson<MessageResponse>('/auth/reset-password', {
    token,
    newPassword,
  });
}
