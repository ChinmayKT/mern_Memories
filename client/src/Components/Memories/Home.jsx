import React, {useState , useEffect}from 'react';
import {Link} from 'react-router-dom'
import {format} from 'timeago.js';
import axios from 'axios'
const Home = () => {

    const [memory ,setMemory] = useState([])
    const [token , setToken] = useState('')

    const getMemories = async(token)=> {
        const res = await axios.get('/api/memories', {
            headers : {Authorization : token}
        })
      
       
        setMemory(res.data)
    }

    useEffect(()=>{
        const token  = localStorage.getItem('tokenStore')
        console.log(token)
        setToken(token)
        if(token){
            getMemories(token)
        }

    },[])

    const deleteMemory = async  (id) => {
   let x = window.confirm("Are you sure to delete this Memory ?");
    if (x) {
    
    console.log(id)
    console.log("deletememory", token)
    try {
        if(token){
            console.log("inside try deletememory", token)
            await axios.delete(`/api/memories/${id}`,{
                headers : {Authorization : token}
            })
            getMemories(token)
            console.log(id,'deleted')
            alert("Memory Will be Deleted");
        }

        
    } catch (error) {
        console.log("eroor in deleting")
        window.location.href = '/';
    }
   
  } else {
    alert("Action canceled");
  }

        
      
    }

    return (
        <div className="note-wrapper" >
            {
                memory.map(memory =>
                    
                    (
                    
                    <div className="card" key={memory._id} >
                            <h4 title={memory.title} >
                               {memory.title}
                            </h4>
                            <div className="text-wrapper" >
                            <p>{memory.content}</p>
                            </div>
                    
            
                        <p className="date">{format(memory.date)}</p>
                        <div className="card-footer" >
                            {memory.name}
                            <Link to={`read/${memory._id}`} className="read" > Read</Link>


                            <Link to={`edit/${memory._id}`} className="edit" > Edit</Link>
                        </div>
                        <button className="close" onClick={() => deleteMemory(memory._id)} > X </button>
                    </div>
                    
                    )
                )
            }
               
        </div>
    )
}

export default Home
