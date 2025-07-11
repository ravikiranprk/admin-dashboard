import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
    {
        name: {
            type:String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        approvalStatus: {
            type: String,
            required: true,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
    }
)

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
