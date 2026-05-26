export type Invoice = {
  id: string;
  client: string;
  email: string;
  amount: number;
  currency: string;
  status: "Overdue" | "Due soon" | "Escalation";
  days: number;
  owner: string;
  nextAction: string;
};

export const invoices: Invoice[] = [
  {
    id: "INV-1023",
    client: "Acme Studio",
    email: "finance@acmestudio.example",
    amount: 3240,
    currency: "EUR",
    status: "Overdue",
    days: 8,
    owner: "Brenda",
    nextAction: "Create friendly reminder draft",
  },
  {
    id: "INV-1044",
    client: "Nova Digital",
    email: "accounts@novadigital.example",
    amount: 2900,
    currency: "EUR",
    status: "Due soon",
    days: -1,
    owner: "Matt",
    nextAction: "Prepare due-soon reminder",
  },
  {
    id: "INV-1055",
    client: "Lima Properties",
    email: "admin@limaproperties.example",
    amount: 13020,
    currency: "EUR",
    status: "Escalation",
    days: 15,
    owner: "Brenda",
    nextAction: "Create internal escalation note",
  },
];

export const proofSteps = [
  "Invoice identified from client-owned source",
  "QuantM Engine applied follow-up rules",
  "Reminder drafted for review",
  "Gmail/Outlook draft created, not sent",
  "Follow-up log updated",
  "Weekly cash-risk brief prepared",
];

export const deploymentModes = [
  {
    title: "Inbox-native",
    body: "Gmail or Outlook drafts become the approval surface. No new daily dashboard.",
  },
  {
    title: "Workspace-native",
    body: "Google Sheets, Airtable, SharePoint, Notion, or Retool acts as the control layer.",
  },
  {
    title: "Chat-native",
    body: "Slack or Teams can receive daily payment-action briefs for teams that already work there.",
  },
];

export const fiveDayPlan = [
  ["Day 1", "Map the current invoice follow-up process"],
  ["Day 2", "Connect the invoice source and clean the fields"],
  ["Day 3", "Define reminder tone, approval gates, and escalation rules"],
  ["Day 4", "Build the QuantM Engine workflow and draft creation flow"],
  ["Day 5", "Test, hand over, and train the team"],
];
