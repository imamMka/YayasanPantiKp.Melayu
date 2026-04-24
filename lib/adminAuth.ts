export const ADMIN_COOKIE_NAME = "admin_auth_token";
export const ADMIN_SECRET = process.env.ADMIN_SECRET || "";

export function isAdminTokenValid(token?: string) {
  return Boolean(ADMIN_SECRET && token === ADMIN_SECRET);
}

export function getAdminCookieValue(cookieStore: { get(name: string): { value: string } | undefined } | undefined) {
  return cookieStore?.get(ADMIN_COOKIE_NAME)?.value;
}
