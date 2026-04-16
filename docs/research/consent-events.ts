export const FSDS_OPEN_PRIVACY_CHOICES = "fsds-open-privacy-choices";

export type PrivacyChoicesOpenDetail = {
  mode: "first" | "details";
};

export function openPrivacyChoices(
  mode: PrivacyChoicesOpenDetail["mode"] = "details",
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<PrivacyChoicesOpenDetail>(FSDS_OPEN_PRIVACY_CHOICES, {
      detail: { mode },
    }),
  );
}
