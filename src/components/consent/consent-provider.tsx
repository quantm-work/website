"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ConsentPolicy } from "@/lib/consent/region";

/**
 * Safe default while the policy resolves — treat the visitor as opt-in so no
 * scripts can load until we know otherwise. `resolved` lets consumers distinguish
 * "still fetching" from "fetched".
 */
const DEFAULT_POLICY: ConsentPolicy = {
  requiresOptIn: true,
  countryCode: null,
  countrySubdivision: null,
  geoLabel: "other",
};

type ConsentPolicyState = ConsentPolicy & { resolved: boolean };

const ConsentPolicyContext = createContext<ConsentPolicyState>({
  ...DEFAULT_POLICY,
  resolved: false,
});

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConsentPolicyState>({
    ...DEFAULT_POLICY,
    resolved: false,
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/consent/policy", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((p: ConsentPolicy | null) => {
        if (cancelled || !p) return;
        setState({ ...p, resolved: true });
      })
      .catch(() => {
        // network/offline — keep safe defaults; mark resolved so UI unblocks
        if (!cancelled) setState((s) => ({ ...s, resolved: true }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ConsentPolicyContext.Provider value={state}>
      {children}
    </ConsentPolicyContext.Provider>
  );
}

export function useConsentPolicy(): ConsentPolicyState {
  return useContext(ConsentPolicyContext);
}
