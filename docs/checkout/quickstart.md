# Getting started

A quickstart guide to integrate StreamPay Checkout into your application. In the following guide we're going to use Next.js as the frontend framework as it supports API routes by default.

::: tip :zap: Full source code for the demo app available [here](https://github.com/stream-protocol/checkout-demo-example.git)
:::

## Setting up the application

Create a new Next.js application using `create-next-app`. You can remove the `--ts` flag if you don't want to use TypeScript.

```bash
npx create-next-app checkout --ts
```

Installing the required packages:

- `@streampay/checkout-ecommerce-sdk` - Node.js SDK for interacting with StreamPay Checkout's API
- `@streampay/react-checkout-sdk` - SDK for simplifying the workflow of integrating StreamPay's Checkout with React.js

```bash
npm install @streampay/checkout-ecommerce-sdk @streampay/react-checkout-sdk
```

## Wrapping the app with StreamPay provider

The Next.js app need to be wrapped w/ the `StreamPayProvider` provider component to be able to use the React SDK. The `StreamPayProvider` takes in the public API key as a prop.

```tsx
import type { AppProps } from "next/app";
import { StreamPayProvider } from "@streampay/react-checkout-sdk";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StreamPayProvider
      publicApiKey={process.env.NEXT_PUBLIC_CP_API!}
    >
      <Component {...pageProps} />
    </StreamPayProvider>
  );
}

export default MyApp;
```

## Creating a Next.js API route

As creating a checkout session requires the developer to pass his private API key we're going to create a Next.js API route which would handling the logic for creating a session, so that the private API keys don't get exposed on the client-side.

Create a new file named `create-session.ts` under the `pages/api` folder and initialize the Node SDK. If you want to collect the end-user's shipping address, change the `collect_shipping_address` parameter to `true`

```ts
import { StreamPay } from "@streampay/checkout-ecommerce-sdk";

const sdk = new StreamPay({
  api_key: process.env.STREAMPAY_PRIVATE_API_KEY!,
  network: "mainnet", // use 'mainnet' for prod and 'devnet' for dev environment
  config: {
    collect_shipping_address: false,
  },
});
```

Create a function called `handler` which would contain the logic for creating a checkout session. The `STATIC_URL` environment variable is the deployed URL of the Next.js application

```ts
const handler = async (req, res) => {
  try {
    const response = await sdk.session.create({
      success_url: `${process.env.STATIC_URL}/success`,
      cancel_url: `${process.env.STATIC_URL}/cancel`,
      tokens: ["dust", "str", "samo"], // additional tokens you can pass, $SOL and $USDC are default
      items: [
        {
          name: "Solana Shades",
          price: 0.1, // price in USD
          image: "https://imgur.com/M0l5SDh.png",
          quantity: 1,
          size: "9", // optional product size param
        },
      ],
       shipping_fees: 0.5, // optional shipping charges param, value in USD
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error creating session",
    });
  }
};

export default handler;
```

## Creating success and cancel pages

If the payment is completed successfully, the user would be redirected to the success URL. If the user chooses to go back, he would be redirected to the cancel URL.

Create a new file named `success.tsx` under the `pages` folder

```tsx
import type { NextPage } from "next";

const Success: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Your payment is successful!</h1>
    </div>
  );
};

export default Success;
```

Create a new file named `cancel.tsx` under the `pages` folder

```tsx
import type { NextPage } from "next";

const Cancel: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>
        Forgot to add something to your cart? Shop around then come back to pay!
      </h1>
    </div>
  );
};

export default Cancel;
```

## Integrating the Checkout button

The React SDK provides a helper component `CheckoutButton` which handles all the internal logic.

Go ahead and open the `index.tsx` file under the `pages` folder. Import the `CheckoutButton` component and pass it in a function that generates a new session by calling the API route (/api/checkout) you have created in the previous step:

```tsx
import type { NextPage } from "next";
import { CheckoutButton } from "@streampay/react-checkout-sdk";

const Home: NextPage = () => {
  const createSession = async () => {
    const response = await fetch("/api/create-session", {
      method: "POST",
    });
    const data = await response.json();

    return data.session_id;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <img src="https://imgur.com/M0l5SDh.png" alt="solana shades" />
      <p>Buy your Solana Shades</p>
      <CheckoutButton handleSession={createSession}>Checkout</CheckoutButton>
    </div>
  );
};

export default Home;
```

## Congratulations! :partying_face:

Your base app is ready to accept Solana Payments with Checkout SDK. Make sure to test your website and contact us at [Discord](https://discord.gg/) if you face any issues! Full source code available [here.](https://github.com/stream-protocol/checkout-demo-example.git)

## Next steps

::: info • [Webhooks](../checkout/webhooks.html)
Set up webhooks to detect and fulfill new payments and run post-checkout events such as saving the transaction details to a database, sending custom emails, and others.
:::

::: info • [Demo e-commerce app](https://github.com/stream-protocol/checkout-ecommerce-example.git)
Access this demo e-commmerce website accepting Solana payments with StreamPay Checkout SDK and refer it to create your own more complex applications accepting cross-border payments.
:::