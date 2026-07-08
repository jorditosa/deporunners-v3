export {};

declare global {
  interface Window {
    umami?: {
      track: (
        arg?: string | Record<string, unknown> | ((props: Record<string, unknown>) => Record<string, unknown>),
        data?: Record<string, unknown>
      ) => void;
      identify: (id: string, data?: Record<string, unknown>) => void;
    };
  }
}
