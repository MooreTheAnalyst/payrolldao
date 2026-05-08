import Badge from "./Badge";
import type { PaymentStatus } from "@/types";

const statusMap: Record<PaymentStatus, { label: string; variant: "success" | "warning" | "error" | "info" | "neutral" }> = {
  COMPLETED: { label: "Completed", variant: "success" },
  PROCESSING: { label: "Processing", variant: "info" },
  PENDING: { label: "Pending", variant: "warning" },
  FAILED: { label: "Failed", variant: "error" },
  CANCELLED: { label: "Cancelled", variant: "neutral" },
};

export default function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const { label, variant } = statusMap[status] ?? { label: status, variant: "neutral" as const };
  return <Badge variant={variant}>{label}</Badge>;
}
