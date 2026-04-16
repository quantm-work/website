export const QMW_OPEN_PRIVACY_CHOICES = "qmw-open-privacy-choices";
export const QMW_CONSENT_UPDATED = "consent-updated";

export type PrivacyChoicesOpenDetail = {
  mode: "first" | "details";
};

export function openPrivacyChoices(
  mode: PrivacyChoicesOpenDetail["mode"] = "details",
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<PrivacyChoicesOpenDetail>(QMW_OPEN_PRIVACY_CHOICES, {
      detail: { mode },
    }),
  );
}
