import Notification from "../models/notification.model.js"

export const newNotification = async (req, res) => {
    try {
       const newNotification = new Notification({...req.body, read: false })
       await newNotification.save()
       res.status(409).json(newNotification)
    } catch (e) {
       res.status(409).json({ message: e.message })
    }
 }

 export const getNotifications = async (req, res) => {
    try {
        const userId = req.query.userId
        let notifications
        if (req.query.read) {
            notifications = await Notification.find({ toUserId: userId, read: req.query.read })
        } else {
            notifications = await Notification.find({ toUserId: userId })
        }
        res.status(200).json(notifications)
    } catch (e) {
       res.status(409).json({ message: e.message })
    }
 }
 export const markAsRead = async (req, res) => {
    try {
        const notificationId = req.query.notificationId
        await Notification.updateMany({ _id: notificationId }, { read: true })
        res.status(200).json(notificationId)
    } catch (e) {
       res.status(409).json({ message: e.message })
    }
 }

 export const hasNewNotifications = async (req, res) => {
    try {
        const userId = req.query.userId
        const newNotifications = await Notification.find({ toUserId: userId, read: false })
        res.status(200).json({ hasNewNotifications: newNotifications.length > 0})
    } catch (e) {
       res.status(409).json({ message: e.message })
    }
 }