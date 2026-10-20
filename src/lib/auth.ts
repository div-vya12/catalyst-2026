export const SUPER_ADMIN_CREDENTIALS = {
  username: "divya",
  password: "ilyspry",
  role: "Super Admin / Root",
};

// Simple auth token generator
export function createAdminToken(username: string): string {
  const payload = {
    user: username,
    role: "root",
    iat: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    if (decoded.user === SUPER_ADMIN_CREDENTIALS.username && decoded.role === "root") {
      // Valid for 7 days
      return Date.now() - decoded.iat < 7 * 24 * 60 * 60 * 1000;
    }
  } catch {
    return false;
  }
  return false;
}
