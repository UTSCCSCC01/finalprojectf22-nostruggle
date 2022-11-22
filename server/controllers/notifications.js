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
        if (req.query.read && !req.query.all) {
            notifications = await Notification.find({ toUserId: userId, read: req.query.read })
        } else {
            notifications = await Notification.find({ toUserId: userId })
        }
        res.status(200).json(notifications.sort((n1, n2) =>  new Date(n2.createdAt) - new Date(n1.createdAt)))
    } catch (e) {
       res.status(409).json({ message: e.message })
    }
 }

 export const getNotificationsPage = async (req, res) => {
   try {
      const userId = req.query.userId
      const itemsPerPage = parseInt(req.query.numItems)
      const pageNum = parseInt(req.params.pageNum)
      let notifications
      if (req.query.read) {
          notifications = await Notification.find({ toUserId: userId, read: req.query.read })
      } else {
          notifications = await Notification.find({ toUserId: userId })
      }
      notifications.sort((n1, n2) =>  new Date(n2.createdAt) - new Date(n1.createdAt))

      if (notifications.length >= itemsPerPage * pageNum){
         res.status(200).json(notifications.slice(itemsPerPage * (pageNum - 1), itemsPerPage * pageNum))
      } else {
         const pageStart = notifications.length - itemsPerPage > 0 ? notifications.length - itemsPerPage : 0
         res.status(200).json(notifications.slice( pageStart, pageStart + itemsPerPage ))
      }
   } catch (e) {
      res.status(409).json({ message: e.message })
   }  
 }

 export const getNotificationsPageCount = async (req, res) => {
   try {
      const userId = req.query.userId
      const itemsPerPage = parseInt(req.query.numItems)
      let notifications
      if (req.query.read) {
          notifications = await Notification.find({ toUserId: userId, read: req.query.read })
      } else {
          notifications = await Notification.find({ toUserId: userId })
      }
      const pageCount = Math.ceil(notifications.length / itemsPerPage)
      res.status(200).json({ pageCount: pageCount })
      
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