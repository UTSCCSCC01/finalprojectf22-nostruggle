import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        console.log(req)
        const tasks = await Task.find({ ...req.query });
        res.status(200).json(tasks);
    } catch (e) {
        res.status(404).json({ ...e });
    };
};

export const postTasks = async (req, res) => {

    const newTask = new Task(req.body);
    console.log(req)
    console.log(newTask)
    try {
        await newTask.save();
        res.status(201).json(newTask);

    } catch (e) {
        console.log(e)
        res.status(409).json({ ...e });
    };
};

export const patchTasks = async (req, res) => {

    /*const taskToUpdate = Task.find(req.body.filters)[0];
    const updateValues = req.body.update;
    for (let changeKey in updateValues)
        taskToUpdate[changeKey] = updateValues[changeKey]

    //taskToUpdate.set(req.body.update)
    console.log(req)
    console.log(taskToUpdate)*/
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