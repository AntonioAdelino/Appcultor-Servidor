import mongoose, { Schema, Document, Model } from 'mongoose';



export interface IArticleModel extends Document {
  title: string,
  content: string,
  tags: [string],
  language?: string,
  author?: string,
}

const articleSchema = new Schema(
  {
    title: { required: true, type: String },
    content: { required: true, type: String },
    tags: { required: true, type: [String] },
    language: { type: String },
    author: { type: String },
  },
  { versionKey: false, timestamps: { createdAt: 'created_at' } },
);

articleSchema.index({ '$**': 'text' }, { default_language: "portuguese" });

export const articleModel: Model<IArticleModel> = mongoose.model('Article', articleSchema);