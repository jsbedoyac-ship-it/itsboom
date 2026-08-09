import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Page HTML must always be revalidated with the server before a cached
  // copy is reused — without this, mobile in-app browsers (WhatsApp,
  // Instagram) and some CDNs hold onto a page from before the latest
  // deploy and never re-check, so visitors keep seeing stale content
  // (old hero copy, missing sections) until they clear that browser's
  // cache by hand. Listed explicitly (rather than a catch-all with
  // exclusions) so this can never accidentally also hit the can-frame
  // sequence or other /public assets, which need the opposite — long,
  // uninterrupted caching — to load reliably.
  async headers() {
    const noCache = { key: "Cache-Control", value: "public, max-age=0, must-revalidate" };
    return ["/", "/productos", "/nosotros", "/contacto"].map((source) => ({
      source,
      headers: [noCache],
    }));
  },
};

export default nextConfig;
