import { Document, Schema, model, models } from "mongoose";
export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string; // Optional
  location?: string; // Optional
  createdAt?: Date;
  imageUrl?: string; // Optional
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string; // Optional
  category?: { _id: string; name: string };
  organizer?: { _id: string; firstName: string; lastName: string };
}
const EventSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now() },
  imageUrl: { type: String },
  startDateTime: { type: Date, require: true },
  endDateTime: { type: Date, require: true },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "Organizer" },
});
const Event = models.Event || model("Event", EventSchema);
export default Event;
