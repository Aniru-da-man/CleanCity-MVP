export type UserRole = "citizen" | "operator" | "manager";

export type PortalSession = {
  email: string;
  name: string;
  role: UserRole;
};

const SESSION_KEY = "cleancity.portal.session";

export const ROLE_LABELS: Record<UserRole, string> = {
  citizen: "Citizen",
  operator: "City operations",
  manager: "City operations",
};

export function getPortalHome(role: UserRole): string {
  return role === "citizen" ? "/citizen" : "/dashboard";
}

export function getSession(): PortalSession | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(SESSION_KEY);
    if (!value) return null;

    const session = JSON.parse(value) as PortalSession;
    if (!session.email || !session.role || !ROLE_LABELS[session.role]) return null;
    return session;
  } catch {
    return null;
  }
}

export function saveSession(session: PortalSession): void {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY);
}
