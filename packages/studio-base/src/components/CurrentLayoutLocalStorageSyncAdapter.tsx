// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import assert from "assert";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import Log from "@foxglove/log";
import { LOCAL_STORAGE_STUDIO_LAYOUT_KEY } from "@foxglove/studio-base/constants/localStorageKeys";
import {
  LayoutState,
  SelectedLayout,
  useCurrentLayoutActions,
  useCurrentLayoutSelector,
} from "@foxglove/studio-base/context/CurrentLayoutContext";
import { LayoutData } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";
import { usePlayerSelection } from "@foxglove/studio-base/context/PlayerSelectionContext";
import { defaultLayout } from "@foxglove/studio-base/providers/CurrentLayoutProvider/defaultLayout";
import { migratePanelsState } from "@foxglove/studio-base/services/migrateLayout";
import { LAYOUT } from "@foxglove/studio-base/constants/layout";
import { diagnostics } from "@foxglove/studio-base/layouts/diagnostics";
import { fetchUrlLayout, getUrlLayoutName } from "@foxglove/studio-base/util/urlLayout";

function selectLayoutData(state: LayoutState) {
  return state.selectedLayout?.data;
}

function onMessageHandler(event: MessageEvent, setCurrentLayout: (newLayout: SelectedLayout | undefined) => void) {
  const { type, layout } = event.data;
  if (type === "updateLayout") {
    if (layout === LAYOUT.DIAGNOSTICS || layout === LAYOUT.VISUALIZATION) {
      const layoutData = layout === LAYOUT.DIAGNOSTICS ? diagnostics : defaultLayout;
      const serializedLayoutData = JSON.stringify(layoutData);
      assert(serializedLayoutData);
      localStorage.setItem(LOCAL_STORAGE_STUDIO_LAYOUT_KEY, serializedLayoutData);

      const data = migratePanelsState((layoutData as LayoutData) || defaultLayout);
      setCurrentLayout({ data });
    }
  }
};

const log = Log.getLogger(__filename);

export function CurrentLayoutLocalStorageSyncAdapter(): JSX.Element {
  const { selectedSource } = usePlayerSelection();
  const { enqueueSnackbar } = useSnackbar();

  const { setCurrentLayout } = useCurrentLayoutActions();
  const currentLayoutData = useCurrentLayoutSelector(selectLayoutData);

  // A layout named in the URL comes from the server on every load and is never kept in the browser
  const [urlLayoutName] = useState(getUrlLayoutName);

  useEffect(() => {
    if (selectedSource?.sampleLayout) {
      setCurrentLayout({ data: selectedSource.sampleLayout });
    }
  }, [selectedSource, setCurrentLayout]);

  const [debouncedLayoutData] = useDebounce(currentLayoutData, 250, { maxWait: 500 });

  useEffect(() => {
    if (!debouncedLayoutData || urlLayoutName != undefined) {
      return;
    }

    const serializedLayoutData = JSON.stringify(debouncedLayoutData);
    assert(serializedLayoutData);
    localStorage.setItem(LOCAL_STORAGE_STUDIO_LAYOUT_KEY, serializedLayoutData);
  }, [debouncedLayoutData, urlLayoutName]);

  useEffect(() => {
    if (urlLayoutName != undefined) {
      return;
    }

    window.addEventListener("message", (event: MessageEvent) => onMessageHandler(event, setCurrentLayout));

    return () => {
      window.removeEventListener("message", (event: MessageEvent) => onMessageHandler(event, setCurrentLayout));
    };
  }, [setCurrentLayout, urlLayoutName]);

  useEffect(() => {
    if (urlLayoutName != undefined) {
      log.debug(`Loading layout ${urlLayoutName} named in the URL`);
      fetchUrlLayout(urlLayoutName)
        .then((layoutData) => {
          setCurrentLayout({ data: migratePanelsState(layoutData) });
        })
        .catch((error: unknown) => {
          log.error(error);
          enqueueSnackbar(String(error), { variant: "error" });
        });
      return;
    }

    log.debug(`Reading layout from local storage: ${LOCAL_STORAGE_STUDIO_LAYOUT_KEY}`);

    const serializedLayoutData = localStorage.getItem(LOCAL_STORAGE_STUDIO_LAYOUT_KEY);

    if (serializedLayoutData) {
      log.debug("Restoring layout from local storage");
    } else {
      log.debug("No layout found in local storage. Using default layout.");
    }

    const layoutData = migratePanelsState(
      serializedLayoutData ? (JSON.parse(serializedLayoutData) as LayoutData) : defaultLayout,
    );
    setCurrentLayout({ data: layoutData });
  }, [enqueueSnackbar, setCurrentLayout, urlLayoutName]);

  return <></>;
}
