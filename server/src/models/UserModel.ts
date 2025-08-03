import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../global_types";

interface IUserDocument extends Omit<IUser, "_id">, Document {
  comparePassword: (password: string) => Promise<boolean>;
  password: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires: Date;
  resendCount: number;
  resendWindowStart: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resendCount: {
      type: Number,
      default: 0,
    },
    resendWindowStart: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "author", "admin", "pending-author"],
      default: "user",
    },
    isAuthor: {
      type: Boolean,
      default: false,
    },
    authorProfile: {
      type: new Schema({
        bio: String,
        avatar: String,
        socialMedia: {
          website: String,
          twitter: String,
          linkedin: String,
        },
        expertise: [String],
      }),
      default: {},
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User ||
  mongoose.model<IUserDocument>("User", UserSchema);
