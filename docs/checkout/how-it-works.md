# How it works

A step-by-step overview of how StreamPay Checkout works and collects payments for you. In this guide we'll learn how Checkout will work in your website with a look at features we provide for multiple use cases! An in-depth implementation is available [here](../checkout/quickstart.html)

## Checkout workflow 

A basic workflow for Checkout from your customer's perspective 

1. Your Customer confirms their order and a new `session` is created based on the order details
2. The created session then redirects customer to a hosted-checkout page where they performs payment in token of their choice 
3. After a successful payment, customer gets redirected back to your website based on the provided URL while creating session
4. All new payments can be detected and fulfilled on your end with our [webhooks module](../checkout/webhooks.html) and Merchant Dashboard

![Workflow diagram](https://i.imgur.com/tBH1EkL.png)