import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental-cache override — nothing on this site uses ISR/revalidate
// yet (single static homepage, soon a hardcoded test invite route). Add an
// R2-backed incremental cache here if/when a real revalidating route needs
// it, not before.
export default defineCloudflareConfig();
