import Task from '../models/task.model.js';
import TaskTime from '../models/taskTime.model.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ ...req.query });
        res.status(200).json(tasks);
    } catch (e) {
        res.status(404).json({ ...e });
    };
};

export const postTasks = async (req, res) => {

    const newTask = new Task(req.body);
    try {
        await newTask.save();
        res.status(201).json(newTask);

    } catch (e) {
        console.log(e)
        res.status(409).json({ ...e });
    };
};

export const patchTasks = async (req, res) => {
    try {
        console.log('updating task')
        await Task.updateMany(req.body.filters, req.body.update)
        console.log("Finished updating")
        res.status(200).json({});
    } catch (e) {
        console.log(e)
        res.status(409).json({ ...e});
    };
};

const dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

export const getDaily = async (req, res) => {
    try {
        const now = new Date(Date.now()).toLocaleDateString('en-us', dateFormat)
        const tasks = await TaskTime.find({ userId: req.query.userId, date: now })
        console.log("Finished updating")
        res.status(200).json(tasks);
    } catch (e) {
        console.log(e)
        res.status(409).json({ ...e});
    };
};

export const postDaily = async (req, res) => {
    try {
        const now = new Date(Date.now()).toLocaleDateString('en-us', dateFormat)
        const filter = { userId: req.query.userId, taskId: req.query.taskId, date: now }
        const taskForToday = await TaskTime.find(filter)
        if (taskForToday.length > 0){
            await TaskTime.updateOne(filter, { timespent: taskForToday[0].timespent + parseInt(req.query.timespent) })
        } else {
            const newTaskTime = new TaskTime({
                ...filter,
                timespent: req.query.timespent
            })
            await newTaskTime.save()
        }        
        res.status(201).json(filter);
    } catch (e) {
        console.log(e)
        res.status(409).json(e);
    };
};


export const getDailySpecificDate = async (req, res) => {
    try {
        const now = new Date(Date.now()).toLocaleDateString('en-us', dateFormat)
        console.log(req.query)
        const tasks = await TaskTime.find({ userId: req.query.userId, date: new Date(parseInt(req.query.date)) })
        console.log("Finished updating")
        res.status(200).json(tasks);
    } catch (e) {
        console.log(e)
        res.status(409).json({ ...e});
    };
};