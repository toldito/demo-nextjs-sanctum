import Link from "next/link";
import {Flex} from "@tremor/react";

import {cn} from "@/shared/utils";
import {PageConfig} from "@/config";

export const PageNav = () => {
  return (
    <nav className="flex-1">
      <Flex alignItems="center" justifyContent="between">
        <ul className="flex items-center flex-1 gap-6">
          {PageConfig.sidebar.map(({title, href, disabled}) => (
            <li key={title}>
              <Link
                className={cn("text-base font-semibold text-gray-600", {"text-gray-300": disabled})}
                href={!disabled ? href : "/"}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <Flex alignItems="center" className="w-auto gap-2">
          <Link className="text-base font-semibold text-gray-600" href="/auth/login">
            Log in
          </Link>
        </Flex>
      </Flex>
    </nav>
  );
};
