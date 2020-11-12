import mongoose, { Schema, Document, Model } from 'mongoose';



export interface ITagModel extends Document {
  title: string,
  tag: string,
  image: string,
}

const tagSchema = new Schema(
  {
    title: { required: true, type: String },
    tag: { required: true, type: String },
    image: { required: true, type: String },
    
  },
  { versionKey: false, timestamps: { createdAt: 'created_at' } },
);

tagSchema.index({ '$**': 'text' }, { default_language: "portuguese" });

export const tagModel: Model<ITagModel> = mongoose.model('Tag', tagSchema);