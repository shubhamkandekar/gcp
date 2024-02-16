// userModel.js
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    required: [true, 'Name field is required.'],
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  email: {
    required: [true, 'Email field is required.'],
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  password: {
    type: Schema.Types.String,
  },
}, { timestamps: true });

// Export the User model
export const User = mongoose.models.User || mongoose.model('User', userSchema);
