import {cn} from "@/shared/utils";

export function DashboardShell({children, className, ...props}) {
  return (
    <div className={cn("space-y-8", className)} {...props}>
      {children}
    </div>
  );
}
