// // API Endpoint (addToCart.ts)
// import Cart from "@/app/models/cartModel";
// import { authenticateToken } from "@/app/middleware/authentication";
// import { NextApiRequest } from "next";
// import { NextResponse } from "next/server";
// import connection from "@/db/config";

// export async function POST(req: NextApiRequest) {
//   try {
//     await connection();
//     // Authenticate the user
//     const user = authenticateToken(req);

//     // Extract productId and quantity from the request body
//     //const body = await req.json();
//     const { id, quantity } = req.body;

//     // Create a new cart item document
//     const cartItem = new Cart({
//       id,
//       quantity,
//       userEmail: user.email,
//     });

//     // Save the cart item to the database
//     await cartItem.save();

//     // Return success response
//     return NextResponse.json(
//       { message: "Item added to cart successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import Cart from "@/app/models/cartModel";
import { authenticateToken } from "@/app/middleware/authentication";
import { NextApiRequest, NextApiResponse } from "next";
import connection from "@/db/config";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connection();
    // Authenticate the user
    const user = authenticateToken(req);

    // Extract productId and quantity from the request body
    const { productId, quantity } = req.body;

    // Create a new cart item document
    const cartItem = new Cart({
      productId,
      quantity,
      userEmail: user.email,
    });

    // Save the cart item to the database
    await cartItem.save();

    // Return success response
    return res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}