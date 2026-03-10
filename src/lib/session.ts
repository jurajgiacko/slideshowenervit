const SESSION_KEY = 'enervit_session';
const TTL_MS = 72 * 60 * 60 * 1000; // 72 hours

interface SessionData {
  user: string;
  expires: number;
}

export function setSession(displayName: string): void {
  const data: SessionData = {
    user: displayName,
    expires: Date.now() + TTL_MS,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function getSession(): string | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const data: SessionData = JSON.parse(raw);
    if (Date.now() > data.expires) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return data.user;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
