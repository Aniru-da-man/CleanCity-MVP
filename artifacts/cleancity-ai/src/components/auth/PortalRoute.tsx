import type { ReactNode } from "react";
import { Redirect } from "wouter";
import { getPortalHome, getSession, type UserRole } from "@/lib/auth";

type PortalRouteProps = {
  children: ReactNode;
  roles: UserRole[];
};

export function PortalRoute({ children, roles }: PortalRouteProps) {
  const session = getSession();

  if (!session) return <Redirect to="/login" />;
  if (!roles.includes(session.role)) return <Redirect to={getPortalHome(session.role)} />;

  return <>{children}</>;
}
