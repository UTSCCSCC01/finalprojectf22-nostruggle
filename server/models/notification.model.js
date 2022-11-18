import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema({
    source: { type: String, required: true, trim:true, minlength: 1 },
    sourceTitle: { type: String, trim:true, minlength: 1 },
    sourceAuthor: { type: String, trim:true, minlength: 1 },
    type: { type: String , required: true },
    toUserId: { type: String, required: true },
    read: { type: Boolean, required: true },
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;