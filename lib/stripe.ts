import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_demo_key", {
  apiVersion: "2024-06-20",
})

export const getStripeCustomer = async (email: string) => {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  })

  if (customers.data.length > 0) {
    return customers.data[0]
  }

  return await stripe.customers.create({
    email,
  })
}
