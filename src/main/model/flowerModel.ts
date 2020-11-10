import mongoose, { Schema, Document, Model } from 'mongoose';



export interface IFlowerModel extends Document {

  scientificName: string,
  names: [string],
  family?: string,
  flowerResources?: [string],
  images?: [string],

}

const flowerSchema = new Schema(
  {
    scientificName: { required: true, type: String },
    names: { required: true, type: [String] },
    family: { type: String },
    flowerResources: { type: [String] },
    images: { type: [String] },
  },
  { versionKey: false, timestamps: { createdAt: 'created_at' } },
);

flowerSchema.index({ '$**': 'text' }, { default_language: "portuguese" });

export const flowerModel: Model<IFlowerModel> = mongoose.model('Flower', flowerSchema);