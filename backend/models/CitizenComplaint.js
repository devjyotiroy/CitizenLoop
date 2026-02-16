import mongoose from "mongoose";

const CitizenComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  complaintType: { type: String, required: true }, 
  location: { type: String, required: true }, 
  complaint: { type: String, required: true },
  proofFiles: [{ type: String }],
  status: {
    type: String,
    enum: [
      "Requested",
      "Received at department",
      "Under Processing",
      "Resolved",
      "Rejected",
      "Unsolved"
    ],
    default: "Requested",
  },
  reason: { type: String },
  assignedOfficer: { type: String },
  assignedOfficerPhone: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  complaintId: { type: String, unique: true }, 
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate ComplaintId with CL prefix
CitizenComplaintSchema.pre("save", function (next) {
  if (!this.complaintId) {
    this.complaintId =
      "CL-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 1000);
  }
  next();
});

export default mongoose.model("CitizenComplaint", CitizenComplaintSchema);