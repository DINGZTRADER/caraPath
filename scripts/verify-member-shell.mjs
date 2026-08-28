import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const layout = await readFile(new URL("../app/members/layout.tsx", import.meta.url), "utf8");

assert.match(
  layout,
  /href="https:\/\/www\.theclarapath\.org\/"/,
  "Member navigation must include a direct link back to the main Clara Path site."
);

assert.match(
  layout,
  /href="\/members"/,
  "Member navigation must retain a Member Area home link."
);

let legacyMemberAppExists = true;
try {
  await access(new URL("../member-app", import.meta.url), constants.F_OK);
} catch {
  legacyMemberAppExists = false;
}

assert.equal(
  legacyMemberAppExists,
  false,
  "The obsolete duplicate member-app directory must not exist."
);

console.log("Member shell regression checks passed.");
