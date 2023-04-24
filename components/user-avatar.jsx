import {Fragment} from "react";
import dynamic from "next/dynamic";
import {Menu, Transition} from "@headlessui/react";
import {signOut, useSession} from "next-auth/react";

import {cn} from "@/shared/utils";

const Avvvatars = dynamic(() => import("avvvatars-react"), {
  ssr: false,
});

export function UserAvatar() {
  const {data: session} = useSession();

  console.log(session.user?.name, session.user?.email);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center gap-2">
          <span className="flex flex-col leading-none text-right">
            <span className="text-sm font-semibold text-slate-800">{session.user?.name}</span>
            <span className="-mt-0.5 text-sm text-slate-400">Administrator</span>
          </span>
          <Avvvatars displayValue="VM" size={40} style="character" value={session.user?.email} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1 ">
            <Menu.Item>
              {({active}) => (
                <button
                  className={cn(
                    "group flex w-full items-center rounded-md p-2 text-sm text-gray-900",
                    {"bg-blue-50": active},
                  )}
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
