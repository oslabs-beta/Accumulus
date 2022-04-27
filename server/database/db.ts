import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;

// Interface for user
interface IUser {
  email: string;
  password: string;
  name: string;
  arn: string;
  externalId: string;
  region: string;
  validatePassword: (passwordTry: string) => Promise<boolean>;
}

// Schema for mongodb

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  arn: { type: String, required: true },
  externalId: { type: String, required: true },
  region: { type: String, required: true },
});

userSchema.methods.validatePassword = async function (passwordTry: string) {
  return bcrypt.compare(passwordTry, this.password);
};

const SALT_WORK_FACTOR: number = 10;
const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
