import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: { type: String, required: true, trim:true, minlength: 1 },
    deadline: { type: Date, required: false },
    timespent: { type: Number, required: false },
    done: { type: Boolean, required: false },
    userId: { type: String },
    archived: { type: Boolean, required: false }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;