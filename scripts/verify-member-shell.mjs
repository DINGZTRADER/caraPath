import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const layout = await readFile(new URL("../app/members/layout.tsx", import.meta.url), "utf8");
const signInPage = await readFile(new URL("../app/sign-in/[[...sign-in]]/page.tsx", import.meta.url), "utf8");

assert.match(
  layout,
  /className="member-main-site-link" href="https:\/\/www\.theclarapath\.org\/"/,
  "Member navigation must include a dedicated link back to the main Clara Path site."
);

assert.match(
  layout,
  /className="member-return-bar"/,
  "The main-site return control must live in its own always-visible bar."
);

assert.match(
  signInPage,
  /href="https:\/\/www\.theclarapath\.org\/"/,
  "Member sign-in navigation must return to the public Clara Path site instead of looping on the member host."
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

const approvedLogoPath = "M9 33.5C15.5 33.5 18.7 28.5 23.3 21.2C27 15.2 30.7 11.4 39 11.4";
assert.equal(
  layout.includes(approvedLogoPath),
  true,
  "The Member Area header must use approved Logo 3."
);
assert.equal(
  signInPage.includes(approvedLogoPath),
  true,
  "The Member Area sign-in screen must use approved Logo 3."
);
assert.equal(
  layout.includes("M33.2 8.4C24.5 6.2"),
  false,
  "The previous circular member logo must not return."
);
assert.equal(
  signInPage.includes("M33.2 8.4C24.5 6.2"),
  false,
  "The previous circular sign-in logo must not return."
);

let memberNavStyles = "";
try {
  memberNavStyles = await readFile(new URL("../app/members/member-nav.css", import.meta.url), "utf8");
} catch {
  memberNavStyles = "";
}

assert.match(
  memberNavStyles,
  /\.member-main-site-link\s*\{[^}]*display:\s*inline-flex;[^}]*\}/s,
  "The dedicated main-site return link must always be visible."
);

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
