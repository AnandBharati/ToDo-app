const todoModel = require('../schemas/todoSchema');


async function getAllTodos(req, res) {
    try {
        const result = await todoModel.find({}).populate("createdBy", 'username')
        // await delete result.createdBy.password;
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json(error);
    }

    // res.status(404).json(error);

}




async function getAllTodosFromUser(req, res) {
    //populate createdBy from auth doc and only username field
    // const result = await todoModel.find({}).populate("createdBy",'username')
    ////populate createdBy from auth doc and for specific username
    const userId = req.params.id || req.body.id;
    console.log('userid', userId)
    try{
        const result = await todoModel.find({ createdBy: userId })
        console.log(result);
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
    }
    // await delete result.createdBy.password;

    // res.status(404).json(error);
}

async function postTodo(req, res) {
    console.log('posting new task', req.body)
    const { id, name, isCompleted, createdBy } = req.body;
    const newTodo = new todoModel({ id, name, isCompleted, createdBy })
    const result = await newTodo.save();
    res.status(200).json(result);
}

async function deleteTodo(req, res) {
    //require id
    const { id } = req.params;
    console.log('deleting task with id', id);

    try {
        const result = await todoModel.findOneAndDelete({ id: id });
        res.status(200).send(result);
        // const result = await newTodo.save();
    } catch (error) {
        res.status(400).json(error.code)
    }
}

async function completeTodo(req, res) {
    const { id, value } = req.params;
    let isCompleted = value === 'true'
    console.log('completing todo with id', id, isCompleted);
    const result = await todoModel.findOneAndUpdate({ id }, { isCompleted })
    res.status(200).json(result);
}


module.exports = {
    getAllTodos,
    getAllTodosFromUser,
    postTodo,
    deleteTodo,
    completeTodo
}