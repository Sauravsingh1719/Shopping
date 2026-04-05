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
        { success: false, message: 'No products found' },
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

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    if (!body.title || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, message: 'Title, price, and category are required fields.' },
        { status: 400 }
      );
    }

    const productData = {
      ...body,
      id: Date.now(),
      stock: body.stock || 0,
      rating: body.rating || 0,
      images: body.images || [body.thumbnail],
      reviews: body.reviews || [],
    };

    const newProduct = await ProductModel.create(productData);

    return NextResponse.json(
      { success: true, message: 'Product successfully added to inventory', data: newProduct },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating product:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error while creating product' },
      { status: 500 }
    );
  }
}