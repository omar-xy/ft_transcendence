"use client";

import React from "react";

export const GlobalContext = React.createContext<{
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

// export default SessionContext;

export function useGlobalContext() {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error(`useSession must be used within a App SessionContext`);
  }
  return context;
}
