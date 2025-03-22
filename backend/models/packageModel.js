import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  recipient: { type: String, required: true },
  email: { type: String, required: true },
  apartment: { type: String, required: true },
  description: { type: String, default: "Description of the package" },
  arrivalDate: { type: Date, required: true },
  carrier: { type: String, required: true },
  size: { type: String, required: true },
  status: {
    type: String,
    enum: ["arrived", "notified", "picked"],
    default: "arrived",
  },
  notificationDate: { type: Date },
  pickupDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const packageModel = mongoose.models.Package || mongoose.model("Package", packageSchema);

export default packageModel;
