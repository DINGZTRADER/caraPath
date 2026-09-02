import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("checkout is disabled while membership terms remain unapproved", async () => {
  const route = await read("../app/api/billing/checkout/route.ts");

  assert.match(route, /proposedCommercialSettings/);
  assert.match(route, /if \(!proposedCommercialSettings\.membershipSalesEnabled\)/);
  assert.match(route, /status:\s*503/);
});

test("public member surfaces do not publish the superseded price or no-trial promise", async () => {
  const files = await Promise.all([
    read("../app/join/page.tsx"),
    read("../app/sign-in/[[...sign-in]]/firebase-sign-in.tsx"),
  ]);
  const combined = files.join("\n");

  assert.doesNotMatch(combined, /£15(?:\/month| per month)?/i);
  assert.doesNotMatch(combined, /no free trial/i);
});
