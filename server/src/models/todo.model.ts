import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema = new Schema<ITodo>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Index for faster user-specific todo queries
todoSchema.index({ userId: 1 });

export default mongoose.model<ITodo>('Todo', todoSchema);