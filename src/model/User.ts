import mongoose, {Schema , Document} from "mongoose"

export interface Message extends Document{
    content:string;
    createdAt:Date
}
const MessageSchema :Schema<Message> = new Schema({
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    isverified:boolean;
    verifyCodeExpiry:Date
    isAcceptingMessage:boolean;

    messages: Message[]
}

const UserSchema :Schema<User> = new Schema({
   username:{
    type:String , 
    required: [true, "username is required" ],
    unique: true,
    trim:true
   },
   email:{
    type:String , 
    required: [true, "email is required" ],
    unique: true,
    match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'please use valid email address']
   },
   password:{
    type:String , 
    required: [true, "password is required" ],
     
   },
   verifyCode:{
    type:String , 
    required: [true, "verifycode is required" ],

   },
   verifyCodeExpiry:{
    type:Date , 
    required: [true, "verify code expiry is required" ],
   },
   isverified:{
    type:Boolean , 
    default:false
   },
   isAcceptingMessage:{
    type:Boolean , 
    default:true
   },
   messages:[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) ||  (mongoose.model<User>("User",UserSchema))

export default UserModel;