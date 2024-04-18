import Product from "@/app/models/productModel";
import connection from "@/db/config";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    await connection();
    const products = await Product.find();
    // console.log(products);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
