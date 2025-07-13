import mongoose,{Schema} from "mongoose";

const subSchema = new Schema(
    {
        subscriber:{
            type:mongoose.Schema.Types.ObjectId,   //One who is subscribing
            ref:"User"
        },
        channel:{
            type:mongoose.Schema.Types.ObjectId,   //One to whom subscriber is subscribing
            ref:"User"
        }
    },
    {timestamps:true}
)

export const Subscription = mongoose.model("Subscription",subSchema)