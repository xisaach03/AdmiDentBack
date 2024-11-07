
import mongoose, { Document, Schema } from 'mongoose';

interface IImage extends Document {
  url: string;
  filename: string;
  createdAt: Date;
}

const imageSchema = new Schema<IImage>({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model<IImage>('Image', imageSchema);

export default Image;
export { IImage };
