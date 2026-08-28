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

assert.match(
  layout,
  /import\s+["']\.\/member-nav\.css["'];/,
  "Member layout must load its narrow-pane navigation overrides."
);

let memberNavStyles = "";
try {
  memberNavStyles = await readFile(new URL("../app/members/member-nav.css", import.meta.url), "utf8");
} catch {
  memberNavStyles = "";
}

assert.match(
  memberNavStyles,
  /\.member-actions a\s*\{[^}]*display:\s*inline-flex;[^}]*\}/s,
  "Member navigation links must remain visible in narrow browser panes."
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
