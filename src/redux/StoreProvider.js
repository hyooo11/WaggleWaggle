"use client";
// import { store } from "./store";
import { Provider } from "react-redux";
import { useRef } from "react";
import { makeStore } from "./store";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    // storeRef.current = store;
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
