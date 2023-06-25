import localFont from "next/font/local";

const gotham = localFont({
  src: [
    {
      path: "../../assets/fonts/GothamBook.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GothamBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GothamMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GothamLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GothamBookItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/GothamBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../assets/fonts/GothamMediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../assets/fonts/GothamLightItalic.ttf",
      weight: "300",
      style: "italic",
    },
  ],
});

export default gotham;
