import mongoose, { Document, Schema } from 'mongoose';

// User Schema
interface IUser extends Document {
    name: string;
    email: string;
    username: string;
    clerkId: string;
    mobileNo: string;
    institute: string;
    interestedCategories: string[];
    registeredEvents: mongoose.Types.ObjectId[];
    pastEvents: mongoose.Types.ObjectId[];
    certificates: string[];
    memberOfClubs: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    clerkId: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    institute: { type: String, required: true },
    interestedCategories: { type: [String], required: true },
    registeredEvents: { type: [Schema.Types.ObjectId], ref: 'Event' },
    pastEvents: { type: [Schema.Types.ObjectId], ref: 'Event' },
    certificates: { type: [String] },
    memberOfClubs: { type: [Schema.Types.ObjectId], ref: 'Club' }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
