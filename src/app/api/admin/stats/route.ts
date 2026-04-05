import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Products';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  try {
    const totalProducts = await ProductModel.countDocuments();

    const lowStockCount = await ProductModel.countDocuments({ stock: { $lt: 10 } });

    const valueAggregation = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$price", "$stock"] } }
        }
      }
    ]);
    const totalInventoryValue = valueAggregation.length > 0 ? valueAggregation[0].totalValue : 0;

    const categoryBreakdown = await ProductModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        lowStockCount,
        totalInventoryValue,
        categoryBreakdown
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}