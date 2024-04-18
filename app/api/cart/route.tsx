// api/cart.ts
import CartItem from "@/app/models/cartModel";
import connection from "@/db/config";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  id: number; 
  userEmail: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  let requestBody: RequestBody | null = null;

  try {
    requestBody = await req.json();
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!requestBody || !requestBody.id || !requestBody.userEmail) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { id, userEmail } = requestBody;

  try {
    await connection();

    const cartItem = new CartItem({
      id,
      userEmail,
    });

    await cartItem.save();

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
