import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Priority, TaskStatus } from "@/lib/types";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

const priorityStyles: Record<Priority, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/25",
  medium: "bg-warning/15 text-warning-foreground border-warning/40 dark:text-warning",
  low: "bg-success/10 text-success border-success/25",
};

const priorityDot: Record<Priority, string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-success",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
        priorityStyles[priority],
      )}
    >
      <span className={cn("size-1.5 rounded-full", priorityDot[priority])} />
      {priority}
    </span>
  );
}

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
};

const statusStyles: Record<TaskStatus, string> = {
  todo: "bg-muted text-muted-foreground border-border",
  "in-progress": "bg-primary/10 text-primary border-primary/25",
  completed: "bg-success/10 text-success border-success/25",
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

export const statusLabel = (s: TaskStatus) => statusLabels[s];

export function AiBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 border-primary/30 bg-primary/10 text-primary", className)}
    >
      <Sparkles className="size-3.5" aria-hidden="true" />
      AI Assistant
    </Badge>
  );
}

export function AiThinking({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-xl border border-primary/25 bg-primary/5 p-5"
      role="status"
      aria-live="polite"
    >
      <p className="flex items-center gap-2 text-sm font-medium text-primary">
        <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
        {label}
      </p>
      <div className="space-y-2">
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "yesterday" : `${days}d ago`;
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}
