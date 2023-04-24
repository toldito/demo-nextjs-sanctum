import Link from "next/link";
import {Robot} from "@react-symbols/icons";
import {Flex} from "@tremor/react";

export const HeaderNavigation = ({children}) => {
  return (
    <header className="flex items-center justify-between h-16 py-4 border-b border-b-slate-200">
      <div className="container">
        <Flex alignItems="center" className="gap-6">
          <Link className="shrink-0" href="/">
            <Robot className="w-auto h-12 text-primary-700 [&>path[fill]]:fill-current" />
          </Link>
          {children}
        </Flex>
      </div>
    </header>
  );
};
