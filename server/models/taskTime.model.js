import mongoose from "mongoose";

const taskTimeSchema = mongoose.Schema({
    taskId: { type: String, required: true, trim: true, minlength: 1 },
    userId: { type: String, required: true, trim: true, minlength: 1 },
    date: { type: Date, required: true },
    timespent: { type: Number, required: false }
}, {
    timestamps: true
});

const TaskTime = mongoose.model('TaskTime', taskTimeSchema);

export default TaskTime;