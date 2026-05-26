import { type NextRequest, NextResponse } from "next/server";

type WorkflowRuntimeResponse = {
  ok?: boolean;
  invoiceId?: string;
  draftSubject?: string;
  draftBody?: string;
  logStatus?: string;
  gmailDraftUrl?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_AR_WORKFLOW_WEBHOOK_URL;
  const demoKey = process.env.N8N_AR_WORKFLOW_DEMO_KEY;

  const body = await request.json().catch(() => ({}));
  const invoiceId = body.invoiceId || "INV-1023";

  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: true,
        synthetic: true,
        invoiceId,
        draftSubject: `Quick follow-up on ${invoiceId}`,
        logStatus:
          "Synthetic mode. Connect the workflow runtime to create real Gmail drafts.",
        message:
          "The website is working. Add N8N_AR_WORKFLOW_WEBHOOK_URL to call the real workflow runtime.",
      },
      { status: 200 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(demoKey ? { "x-quantm-demo-key": demoKey } : {}),
      },
      body: JSON.stringify({
        invoiceId,
        source: "quantm-website-demo",
        requestedAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    const text = await response.text();
    let payload: WorkflowRuntimeResponse;

    try {
      payload = JSON.parse(text);
    } catch {
      payload = {
        ok: response.ok,
        invoiceId,
        message: text,
      };
    }

    return NextResponse.json(payload, { status: response.ok ? 200 : 502 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        invoiceId,
        message:
          error instanceof Error
            ? error.message
            : "Unknown workflow runtime connection error",
      },
      { status: 502 },
    );
  }
}
