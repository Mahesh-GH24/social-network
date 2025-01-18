import { Schema, Document, Types } from 'mongoose';

//interface for Reaction
interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt : Date;
}

//interface for Thought
interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Schema.Types.ObjectId[]; // replies
}

//Schema to create reaction model
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default:() => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required:true,
            maxlength:280,
        },
        username: {
            type: String,
            required: true, 
        },
        createdAt: {
            type: Date,
            default:Date.now(),            
        },
    },
    {
        timestamps: true,
        _id: false
    }
);

//Schema to create Thought model
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true, 
            minlength: 1,
            maxlength:280,
        },
        createdAt: {
            type: Date,
            default:Date.now(),
            required:true,
            unique:true,
        },
        username: {
            type: String,
            required: true, 
        },
        reactions: [reactionSchema],
    },

    {
        //Include Virtuals
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

//Create Virtual called reactionCount
thoughtSchema
    .virtual('reactionCount')
    //Getter
    .get(function (this: any) {
        return `${this.reaction.length}`;
    }
)


