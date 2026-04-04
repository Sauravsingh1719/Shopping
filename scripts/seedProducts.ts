import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import ProductModel from "@/models/Products";

dotenv.config();

async function seedProducts() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is missing");

    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    await ProductModel.collection.drop().catch(() => {
      console.log("Collection does not exist yet, skipping drop");
    });

    const filePath = path.join(process.cwd(), "products_array.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(rawData);

    await ProductModel.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    await mongoose.disconnect();
    console.log("Disconnected");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedProducts();