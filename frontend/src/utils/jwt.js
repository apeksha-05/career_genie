/**
 * Lightweight client-side JWT utilities.
 *
 * IMPORTANT: These helpers decode WITHOUT signature verification.
 * They are used only for UI-layer gating (route guards, redirects).
 * All real authorization decisions are enforced server-side via the
 * `authenticate` + `authorize` middleware which DOES verify the signature.
 */

/**
 * Decode the payload of a JWT without verifying its signature.
 * Returns null if the token is malformed.
 */
export function decodeJWTPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Returns true if the token is expired or malformed.
 * Uses the `exp` claim in the payload.
 */
export function isTokenExpired(token) {
  const payload = decodeJWTPayload(token);
  if (!payload || typeof payload.exp !== 'number') return true;
  return payload.exp < Math.floor(Date.now() / 1000);
}

/**
 * Extracts the role field directly from the JWT payload.
 * This prevents localStorage user-object tampering from escalating privileges
 * at the UI level — an attacker can change localStorage.user.role but cannot
 * change the role inside a properly signed JWT without knowing the secret.
 */
export function getRoleFromToken(token) {
  const payload = decodeJWTPayload(token);
  return payload?.role ?? null;
}
