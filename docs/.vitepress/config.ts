import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "StreamPay",
  description: "Seamless, mobile-native NFT & Payments experiences on Solana Blockchain",

  lastUpdated: true,
  cleanUrls: "without-subfolders",

  head: [
    ["meta", { name: "theme-color", content: "#00072c" }],
    [
      "link",
      {
        rel: "icon",
        href: "https://i.imgur.com/pyo8B59.png",
      },
    ],
  ],

  markdown: {
    headers: {
      level: [0, 0],
    },
  },

  themeConfig: {
    logo: "https://res.cloudinary.com/dtzqgftjk/image/upload/v1669972940/https://i.imgur.com/pyo8B59.png2_cdaoyi_1_somgup.png",

    editLink: {
      pattern: "https://github.com/stream-protocol/streampay-docs/edit/main/docs/:path",
      text: "Suggest changes to this page",
    },

    nav: [
      {
        text: "Get Started",
        link: "/checkout/introduction.html",
      },
      {
        text: "Checkout",
        link: "/checkout/introduction.html",
      },
    ],

    socialLinks: [
      { icon: "twitter", link: "https://twitter.com/stream_protocol" },
      { icon: "discord", link: "https://dsc.gg/streampay" },
    ],

    footer: {
      copyright: "Built on Solana",
    },

    sidebar: [
      {
        text: "Getting Started",
        collapsible: true,
        items: [
          {
            text: "Introduction",
            link: "/introduction.html",
          },
          {
            text: "Terminology",
            link: "/terminology.html",
          },
          {
            text: "How it works",
            link: "/how-it-works.html",
          },
        ],
      },
      {
        text: "Checkout",
        collapsible: true,
        items: [
          {
            text: "Introduction",
            link: "/checkout/introduction.html",
          },
          {
            text: "How it works",
            link: "/checkout/how-it-works.html",
          },
          {
            text: "Quickstart",
            link: "/checkout/quickstart.html",
          },
          {
            text: "Node SDK",
            link: "/checkout/node-sdk.html",
          },
          {
            text: "React SDK",
            link: "/checkout/react-sdk.html",
          },
          {
            text: "Webhooks",
            link: "/checkout/webhooks.html",
          },
        ],
      },
      {
        text: "Guides",
        collapsible: true,
        items: [
          {
            text: "Create NFT collection",
            link: "/guides/create-and-launch-nft-collection.html",
          },
        ],
      },
      {
        text: "Utility SDK",
        collapsible: true,
        items: [
          {
            text: "Overview",
            link: "/utility-sdk/index.html",
          },
          {
            text: "Candy Machine module",
            link: "/utility-sdk/modules/candy-machine.html",
          },
          {
            text: "NFT module",
            link: "/utility-sdk/modules/nft.html",
          },
        ],
      },
    ],
  },
});
