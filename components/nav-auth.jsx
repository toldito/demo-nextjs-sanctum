import {usePathname} from "next/navigation";
import {Icon} from "@tremor/react";
import Link from "next/link";

import {Icons} from "@/components/icons";
import {cn} from "@/shared/utils";

export function DashboardNav({items, title}) {
  const path = usePathname();

  if (!items?.length) return null;

  return (
    <div className="space-y-4">
      {title && <h3 className="text-xs font-semibold uppercase text-slate-400">{title}</h3>}
      <nav className="grid items-start gap-2">
        {items.map((item, index) => {
          const IconMenu = Icons[item.icon || "squares"];

          return (
            <Link key={`${index}`} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100",
                  path === item.href ? "bg-slate-100 text-primary-500" : "bg-transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="stroke-current text-primary-500" icon={IconMenu} size="sm" />
                <span>{item.title}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
