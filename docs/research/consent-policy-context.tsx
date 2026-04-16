"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { ConsentGeoLabel } from "@/types/analytics";

export type ConsentPolicyValue = {
  requiresOptIn: boolean;
  countryCode: string | null;
  geoLabel: ConsentGeoLabel;
};

const ConsentPolicyContext = createContext<ConsentPolicyValue>({
  requiresOptIn: true,
  countryCode: null,
  geoLabel: "other",
});

export function ConsentPolicyProvider({
  value,
  children,
}: {
  value: ConsentPolicyValue;
  children: ReactNode;
}) {
  return (
    <ConsentPolicyContext.Provider value={value}>
      {children}
    </ConsentPolicyContext.Provider>
  );
}

export function useConsentPolicy(): ConsentPolicyValue {
  return useContext(ConsentPolicyContext);
}
