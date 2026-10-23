"use client";

import { openCookieSettings } from "@/lib/consent";

/** Footer entry that reopens the consent banner so the choice can be changed or withdrawn. */
export default function CookieSettingsButton() {
  return (
    <button type="button" onClick={openCookieSettings} className="hover:text-paper">
      Cookie settings
    </button>
  );
}
