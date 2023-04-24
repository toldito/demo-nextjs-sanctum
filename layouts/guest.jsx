import {HeaderNavigation} from "@/components/header-navigation";
import {PageNav} from "@/components/nav";

export const GuestLayout = ({children}) => {
  return (
    <>
      <HeaderNavigation>
        <PageNav />
      </HeaderNavigation>
      <main>{children}</main>
    </>
  );
};
