import { Schema, model, Document } from 'mongoose';

//interface for User
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
}

//Schema to create User model
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique:true,
            required: true, 
            trim: true,
        },
        email: {
            type: String,
            required:true,
            unique:true,
            
            // email validator
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Must be a valid email address!'],
            //match: [/.+@.\..+/, 'Must be an email address!'],

            // validate: {
            //     validator: () => Promise.resolve(false),
            //     message: 'Email validation failed'
            // }
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'thought',
            },
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'user'
            },
        ]
    },
    {
        //Include Virtuals
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Create Virtual called friendCount
userSchema
    .virtual('friendCount')
    //Getter
    .get(function (this: any) {
        return `${this.friends.length}`;
    }
)

//initialize User Model 
const User = model('user',userSchema);

export default User;