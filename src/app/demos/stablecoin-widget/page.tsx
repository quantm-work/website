import type { Metadata } from "next";
import { StablecoinWidget } from "@/components/widgets/stablecoin-table/stablecoin-widget";

export const metadata: Metadata = {
  title: "Stablecoin Monitor — Widget Demo",
  description:
    "Isolated preview of a single institutional stablecoin monitor widget.",
  robots: { index: false, follow: false },
};

export default function StablecoinWidgetDemoPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-16">
      <div className="w-full">
        <StablecoinWidget />
      </div>
    </main>
  );
}
