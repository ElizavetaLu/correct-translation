import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
    email: string;
    password: string;
    verifyPassword: (candidatePassword: string, callback: any) => void;
}

const userSchema: Schema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
});

userSchema.pre<IUser>('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function (
    candidatePassword: string,
    callback: any,
) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {

        if (err) return callback(err); 
        callback(null, isMatch, { message: "Not a valid password" });
    });
};

const User: Model<IUser> = mongoose.model<IUser>('user', userSchema);

export default User;
