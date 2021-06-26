const Memories = require('../models/memoryModel')

const memoryController = { 
    getMemories : async  (req,res)=> {

        try {

            
            const memories = await Memories.find({user_id: req.user.id })

            console.log("from get memory",{user_id : req.user.id , name : req.user.name })
            res.json(memories)


        } catch (error) {
            return res.status(500).json({msg : error.message})
        }

    },

    createMemory : async  (req,res)=> {
        try {

            const {title , content , date } = req.body
            
            const newMemory = new Memories({
                title ,
                content,
                date,
                user_id : req.user.id, 
                name : req.user.name
            })
          
            await newMemory.save()
          
            res.json({name: req.user.name, title:title, msg:'memory added'})
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }

    }, 

    deleteMemory : async  (req,res)=> {
        try {
            await Memories.findByIdAndDelete(req.params.id)
            res.json({msg : "Memory Deleted"})      
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    updateMemory : async  (req,res)=> {
        try {
            const {title , content , date } = req.body
            await Memories.findOneAndUpdate({_id:req.params.id},{
                title,
                content,
                date
            })

            res.json({msg:"memory updated"})
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    }
    , 

    getMemory : async  (req,res)=> {
        try {
            const memory = await Memories.findById(req.params.id)
            res.json({mem: memory})
            
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    }

}


module.exports = memoryController