"use client";

import React, { useEffect, useRef } from "react";
import type { AppStore } from "@/redux/store";
import { makeStore } from "@/redux/store";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current !== null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
