import {Inter} from "next/font/google";
const inter = Inter({subsets: ["latin"]});

export const Fonts = () => {
  return (
    <style global jsx>
      {`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}
    </style>
  );
};
