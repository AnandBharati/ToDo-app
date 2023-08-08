const router = require('express').Router();
const { getAllTodos, postTodo, getAllTodosFromUser, deleteTodo, completeTodo } = require('../controllers/todoController')

router.get('/', getAllTodos);

router.get('/:id', getAllTodosFromUser);

router.post('/', getAllTodosFromUser);

router.post('/new', postTodo)

router.delete('/:id', deleteTodo)
router.patch('/:id/:value', completeTodo)

module.exports = router;