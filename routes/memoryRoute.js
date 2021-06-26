const router = require('express').Router()

const auth = require('../middlewares/auth')
const memoryController = require('../controllers/memoryController')

router.route('/')
    .get(auth ,memoryController.getMemories )
    .post(auth , memoryController.createMemory)



router.route('/:id')
    .get(auth , memoryController.getMemory)
    .put(auth , memoryController.updateMemory)
    .delete(auth , memoryController.deleteMemory)



module.exports = router