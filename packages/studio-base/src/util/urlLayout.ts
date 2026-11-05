// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { LayoutData } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";

const LAYOUT_NAME_PATTERN = /^[A-Za-z0-9_-]+$/;

/**
 * Name of the layout given as `?layout=<name>` in the page URL, undefined if there is none.
 */
export function getUrlLayoutName(): string | undefined {
  const name = new URL(window.location.href).searchParams.get("layout");
  return name == undefined || name === "" ? undefined : name;
}

/**
 * Fetches `layouts/<name>.json` from the server of this page. Only a plain file name is accepted:
 * a layout can carry user scripts, so it must come from that server and not from any URL.
 */
export async function fetchUrlLayout(name: string): Promise<LayoutData> {
  if (!LAYOUT_NAME_PATTERN.test(name)) {
    throw new Error(`Invalid layout name "${name}"`);
  }
  const response = await fetch(`layouts/${name}.json`, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Layout "${name}" not found on this server (HTTP ${response.status})`);
  }
  return (await response.json()) as LayoutData;
}
