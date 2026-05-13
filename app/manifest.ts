import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Webbly",
    short_name: "Webbly",
    description: "Profesjonelle nettsider for norske bedrifter.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#1e140e",
    icons: [
      { src: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
