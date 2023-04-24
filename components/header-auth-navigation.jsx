import Link from "next/link";
import {Robot} from "@react-symbols/icons";

export function HeaderAuthNavigation() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link className="" href="/">
        <Robot className="w-auto h-12 text-primary-700 [&>path[fill]]:fill-current" />
      </Link>
    </div>
  );
}
