// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//Export the POST function to handle POST requests
export async function POST(req: NextRequest) {
  // Check if the request method is POST
  if (req.method === "POST") {
    try {
      // Parse the request body as JSON
      const requestBody = await req.json();

      // Check if req.body.cartItems is defined and not empty
      if (
        !requestBody ||
        !requestBody.cartItems ||
        !Array.isArray(requestBody.cartItems) ||
        requestBody.cartItems.length === 0
      ) {
        return NextResponse.json(
          { error: "Invalid cart items data" },
          { status: 400 }
        );
      }

      // Your POST method logic here
      const items = requestBody.cartItems;

      const transformedItems = items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      const shippingCost = items.length > 0 ? 4.99 : 0;

      // calculate tax

      // Define the tax rate
      const TAX_RATE = 0.13;

      // Calculate the tax amount based on the tax rate and total price
      const taxAmount =
        TAX_RATE * items.reduce((acc: any, item: any) => acc + item.price, 0);
      // console.log(taxAmount);

      // Convert tax amount to cents and round it to the nearest integer
      const taxAmountInCents = Math.round(taxAmount * 100);

      // Add tax as a line item
      transformedItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Tax",
          },
          unit_amount: taxAmountInCents, // Convert tax rate to cents
        },
        quantity: 1, // Assuming one unit of tax
      });

      // Add shipping as a line item
      transformedItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
          },
          unit_amount: shippingCost * 100, // Convert shipping cost to cents
        },
        quantity: 1, // Assuming one unit of shipping
      });

      const HANDLING_FEE = 2.99;

      // Add handling fee as a line item
      transformedItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Handling Fee",
          },
          unit_amount: HANDLING_FEE * 100, // Convert handling fee to cents
        },
        quantity: 1, // Assuming one unit of handling fee
      });

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "GB"],
        },
        mode: "payment",
        success_url: `${req.headers.get("origin")}/User/Success`,
        cancel_url: `${req.headers.get("origin")}/User/Cancel`,
      });
      return NextResponse.json({ sessionURL: session.url });
    } catch (err: any) {
      // Handle any errors
      console.log(err);
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode || 500 }
      );
    }
  } else {
    // Return a JSON response indicating method not allowed using NextResponse.json
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
