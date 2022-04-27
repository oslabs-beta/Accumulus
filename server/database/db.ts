import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

//interface for Typescript
interface IUser {
    password: string;
    email: string;
    arn: string;
    externalid: string;
    region: string;
}

//Schema for mongodb

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, set: hash},
    arn: { type: String, required: true},
    externalid: { type: String, required: true},
    region: { type: String, required: true}
})

const SALT_WORK_FACTOR: number = 10;
const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)

async function hash(value:string) {
  const result:string = await bcrypt.hashSync(value, salt);
  return result;
}

const User = model<IUser>('User', userSchema);

export default User;