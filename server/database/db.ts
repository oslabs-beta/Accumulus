import mongoose, { Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface for user
interface IUser {
  email: string;
  password: string;
  arn: string;
  externalId: string;
  region: string;
  validatePassword: (passwordTry: string) => Promise<boolean>;
}

// Schema for mongodb

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, set: hash },
  arn: { type: String, required: true },
  externalId: { type: String, required: true },
  region: { type: String, required: true },
});

userSchema.methods.validatePassword = async function (passwordTry: string) {
  return bcrypt.compare(passwordTry, this.password);
};

const SALT_WORK_FACTOR: number = 10;
const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

async function hash(value: string) {
  const result: string = await bcrypt.hashSync(value, salt);
  return result;
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
