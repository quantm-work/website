import { CONTACT_EMAIL_ENCODED, SUPPORT_EMAIL_ENCODED } from "./config";

export function decodeEmail(): string {
  return atob(CONTACT_EMAIL_ENCODED);
}

export function getMailtoLink(): string {
  return `mailto:${decodeEmail()}`;
}

export function decodeSupportEmail(): string {
  return atob(SUPPORT_EMAIL_ENCODED);
}

export function getSupportMailtoLink(): string {
  return `mailto:${decodeSupportEmail()}`;
}
