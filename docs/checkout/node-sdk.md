# `@streampay/checkout-ecommerce-sdk`

## Installation

```bash
npm install @streampay/checkout-ecommerce-sdk
```

## Setup

The entrypoint to the Node.js SDK is `StreamPay` instance that will give you access to its API. It accepts an configuration object with the following fields:

- `private_api_key` - The private API key which is been issued to the developer while generating an API key
- `network` - The Solana cluster on which the payment checkout would take place i.e either `mainnet` or `devnet`
- `collect_shipping_address` - A boolean to configure whether to show a shipping address form on the checkout page

  ```ts
  import { StreamPay } from "@streampay/checkout-ecommerce-sdk";
  import dotenv from "dotenv";

  dotenv.config();

  const streampay = new StreamPay({
    private_api_key: process.env.STREAMPAY_PRIVATE_API_KEY!,
    network: "mainnet",
    config: {
      collect_shipping_address: true,
    },
  });
  ```

## Session module

The `session` module can be accessed via `streampay.session()` and provides the following methods:

- [`create`](#create)

### `create`

The `create` method creates and creates a new checkout session with the required configuration. It takes in the following parameters and returns `session_id`:

- `items` - An array of items which would be displayed on the checkout page. Each element of the `items` array is an object which would contain the `name`, `price`, `image`, `quantity` and `size` of the product
- `shipping_fees` - An optional param which takes shipping fees (value in $USD) and add it on total cart value to charge users (we currently only support static value for shipping fees, please charge accordingly)
- `tokens` - An array of SPL tokens in which the customer could pay. By default, `SOL` and [`USDC`](https://explorer.solana.com/address/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v) ([`USDC-DEV`](https://explorer.solana.com/address/Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr?cluster=devnet) on devnet) would be shown to the customer on the checkout page. Currently, StreamPay checkout only supports the following tokens on mainnet:

  - [`SAMO`](https://explorer.solana.com/address/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU)
  - [`STR`](https://explorer.solana.com/address/5P3giWpPBrVKL8QP8roKM7NsLdi3ie1Nc2b5r9mGtvwb)
  - [`DUST`](https://explorer.solana.com/address/DUSTcnwRpZjhds1tLY2NpcvVTmKL6JJERD9T274LcqCr)
  - [`SHDW`](https://explorer.solana.com/address/SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y)

    ```ts
    const session = await sdk.session.create({
      success_url: "https://your-website.com/checkout/success",
      cancel_url: "https://your-website.com/checkout/cancel",
      tokens: ["dust", "samo", "str", "shdw"],
      items: [
        {
          name: "Throwback Hip Bag",
          price: 43.57, // value in USD 
          image: "https://imgur.com/EntGcVQ.png",
          quantity: 1,
          size: "M", // optional
        },
      ],
      shipping_fees: 0.43, // optional | value in USD
    });
    ```

## Webhook module

The `webhook` module can be accessed via `streampay.webhook()` and provides the following methods:

- [`register`](#register)

### `register`

The `register` method registers a webhook for a specific checkout session for listening to actions such as `transaction.successful`, `transaction.failed`. It takes in the following parameters and returns `webhook_secret` which can be used to validate the API calls in the webhook server:

- `webhook_url` - The URL endpoint of the webhook. If your webhook server is running on localhost, you may wanna use localhost tunneling options such as [ngrok](https://ngrok.com) or [localhost.run](https://localhost.run)
- `name` - Name of the webhook
- `description` - A short description regarding the webhook

  ```ts
  const webhook = await sdk.webhook.register({
    webhook_url: "https://your-webhook-url.com",
    name: "e-com webhook",
    description: "webhook for my e-com site",
  });
  ```
  Access more details about [Webhooks Module here!](../checkout/webhooks.md)
