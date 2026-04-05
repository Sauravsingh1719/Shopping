import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Products';

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const categoryQuery = searchParams.get('category');

    let dbQuery = {};
    if (categoryQuery) {
      dbQuery = { category: { $regex: new RegExp(`^${categoryQuery}$`, 'i') } };
    }

    const products = await ProductModel.find(dbQuery)
      .sort({ createdAt: -1 })
      .lean();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No products found in this category' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}