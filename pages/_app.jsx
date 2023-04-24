import "@/styles/globals.css";
import {SessionProvider} from "next-auth/react";

import {Fonts} from "@/components/ui/fonts";

export default function App({Component, pageProps}) {
  return (
    <>
      <Fonts />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
