/** @jest-environment jsdom */
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { CurrentLayoutLocalStorageSyncAdapter } from "@foxglove/studio-base/components/CurrentLayoutLocalStorageSyncAdapter";
import { LOCAL_STORAGE_STUDIO_LAYOUT_KEY } from "@foxglove/studio-base/constants/localStorageKeys";
import {
  LayoutState,
  useCurrentLayoutSelector,
} from "@foxglove/studio-base/context/CurrentLayoutContext";
import MockCurrentLayoutProvider from "@foxglove/studio-base/providers/CurrentLayoutProvider/MockCurrentLayoutProvider";

describe("CurrentLayoutLocalStorageSyncAdapter", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    localStorage.clear();
    window.history.replaceState(undefined, "", "/");
  });

  it("loads the layout named in the URL, not the copy kept in the browser", async () => {
    const storedLayout = JSON.stringify({
      configById: { "RawMessages!stored": {} },
      globalVariables: {},
      userNodes: {},
      layout: "RawMessages!stored",
    });
    localStorage.setItem(LOCAL_STORAGE_STUDIO_LAYOUT_KEY, storedLayout);
    window.history.replaceState(undefined, "", "/?layout=web_ui_layout");
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        configById: { "RawMessages!server": {} },
        globalVariables: {},
        userNodes: {},
        layout: "RawMessages!server",
      }),
    });
    global.fetch = fetchMock;

    let shownLayout: unknown;
    function ShownLayout(): ReactNull {
      shownLayout = useCurrentLayoutSelector(
        (state: LayoutState) => state.selectedLayout?.data?.layout,
      );
      return ReactNull;
    }

    render(
      <SnackbarProvider>
        <MockCurrentLayoutProvider>
          <CurrentLayoutLocalStorageSyncAdapter />
          <ShownLayout />
        </MockCurrentLayoutProvider>
      </SnackbarProvider>,
    );

    await waitFor(() => {
      expect(shownLayout).toEqual("RawMessages!server");
    });
    expect(fetchMock).toHaveBeenCalledWith("layouts/web_ui_layout.json", { cache: "no-cache" });

    // past the debounce of the browser copy (250 ms, at most 500 ms): it must stay untouched
    await new Promise((resolve) => setTimeout(resolve, 600));
    expect(localStorage.getItem(LOCAL_STORAGE_STUDIO_LAYOUT_KEY)).toEqual(storedLayout);
  });
});
