import { model, Schema } from "mongoose";
import {
  TBannerImage,
  TCategories,
  TFaqItem,
  TLayout,
} from "./layout.interface";

const FaqSchema = new Schema<TFaqItem>({
  question: String,
  answer: String,
});
const CategoriesSchema = new Schema<TCategories>({
  title: String,
});

const BannerImageSchema = new Schema<TBannerImage>({
  public_url: String,
  url: String,
});

const layoutSchema = new Schema<TLayout>(
  {
    type: String,
    faq: [FaqSchema],
    categories: [CategoriesSchema],
    banner: {
      image: BannerImageSchema,
      title: String,
      subTitle: String,
    },
  },
  { timestamps: true }
);


export const LayoutModel=model<TLayout>('layout',layoutSchema)