"use node";

import Stripe from "stripe";
import { v } from "convex/values";

import { action, internalAction } from "./_generated/server";

const url = process.env.NEXT_PUBLIC_APP_URL;
const stripe = new Stripe(
    process.env.STRIPE_API_KEY!,
    {
        apiVersion: "2024-06-20",
    },
);

export const pay = action({
    args: { orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        if (!args.orgId) {
            throw new Error("No organization ID");
        }

        const session = await stripe.checkout.sessions.create({
            success_url: url,
            cancel_url: url,
            customer_email: identity.email,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Board Pro",
                            description: "Unlimited boards for your organization",
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                orgId: args.orgId,
            },
            mode: "subscription"
        });

        return session.url!;
    }
});

export const fulfill = internalAction({
    args: { signature: v.string(), payload: v.string() },
    handler: async (ctx, { signature, payload }) => {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

        try {
            const event = stripe.webhooks.constructEvent(
                payload,
                signature,
                webhookSecret
            );

            const session = event.data.object as Stripe.Checkout.Session;

            if (event.type === "checkout.session.completed") {
                console.log("CHECKOUT_COMPLETED");
            }

            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false };
        }
    }
});