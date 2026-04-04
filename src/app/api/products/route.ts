import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Product from "@/models/Products";

export async function GET() {
    await dbConnect();

    try {
        const products = await Product.find({})
        .sort({ createdAt: -1 })
        .lean();

    if (!products || products.length === 0) {
    return NextResponse.json({ message: "No products found" }, { status: 404 });
}

    return NextResponse.json(
        {success: true, data: products },
        { status: 200 }
    );
} catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
        { success: false, message: "Failed to fetch products" },
        { status: 500 }
    )
}
}