import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface IReview {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IMeta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

export interface IProduct extends Document {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: IDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IMeta;
  images: string[];
  thumbnail: string;
  wishlistCount: number;
  viewCount: number;
  salesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const DimensionsSchema = new Schema<IDimensions>({
  width: { type: Number },
  height: { type: Number },
  depth: { type: Number }
}, { _id: false });

const ReviewSchema = new Schema<IReview>({
  rating: { type: Number },
  comment: { type: String },
  date: { type: Date },
  reviewerName: { type: String },
  reviewerEmail: { type: String }
}, { _id: false });

const MetaSchema = new Schema<IMeta>({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  barcode: { type: String },
  qrCode: { type: String }
}, { _id: false });

const ProductSchema: Schema = new Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    tags: [{ type: String }],
    brand: { type: String },
    sku: { type: String },
    weight: { type: Number },
    dimensions: { type: DimensionsSchema },
    warrantyInformation: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: { type: String },
    reviews: [ReviewSchema],
    returnPolicy: { type: String },
    minimumOrderQuantity: { type: Number, default: 1 },
    meta: { type: MetaSchema },
    images: [{ type: String }],
    thumbnail: { type: String, required: true },

    wishlistCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProductModel: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;