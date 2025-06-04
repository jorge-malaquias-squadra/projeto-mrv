import * as mongoose from 'mongoose';

export const LeadSchema = new mongoose.Schema({
  id: String,
  contactFirstName: String,
  category: String,
  description: String,
  price: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
