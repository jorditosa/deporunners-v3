import type { User } from "../interfaces/user.interface";

// ponytail: Capacitor WebView reports hostname "localhost", not the real
// domain — override it so Umami website-domain restrictions don't drop events.
const APP_HOSTNAME = "app.deporunners.com";

export function identifyUmamiUser(user: User) {
  window.umami?.identify(String(user.id), {
    username: user.username,
  });
}

export function patchUmamiHostname() {
  const umami = window.umami;
  if (!umami) return;

  const originalTrack = umami.track.bind(umami);
  umami.track = (arg?: unknown, data?: Record<string, unknown>) => {
    if (typeof arg === "function") {
      return originalTrack((props: Record<string, unknown>) => ({
        ...(arg as (props: Record<string, unknown>) => Record<string, unknown>)(props),
        hostname: APP_HOSTNAME,
      }));
    }
    return originalTrack((props: Record<string, unknown>) => ({
      ...props,
      ...(typeof arg === "string" ? { name: arg, data } : (arg as object)),
      hostname: APP_HOSTNAME,
    }));
  };
}
