import React , {useState , useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const ReadMemory = ({match}) => {

    const [memory ,setMemory] = useState({
        title : '',
        content : '' ,
        date : '',
        id: ''
    })

    const history =  useHistory()

    useEffect(()=>{
        const getNote = async () => {
            const token = localStorage.getItem('tokenStore')
            console.log("read " , token)
            if(match.params.id){
                const res= await axios.get(`/api/memories/${match.params.id}` , {
                    headers: {Authorization : token}
                })

                console.log(match.params.id)
                console.log(res)
                console.log(res.data)
                console.log(res.data.mem)
                console.log(res.data.mem.title)

                const Data = res.data.mem

                setMemory({ 
                    title : Data.title, 
                    content : Data.content,
                    date : new Date(Data.date).toLocaleDateString() ,
                    id : Data._id

                })
            }
        }
        getNote()
    },[match.params.id])

    const onChangeInput =  (e) => {
        const {name , value} = e.target;
        setMemory({...memory , [name]: value})
    }

    const editMemory = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title , content , date , id} = memory;
                const newMemory = {
                    title , content , date
                }
                console.log(newMemory)
                await axios.put(`/api/memories/${id}`, newMemory , {
                    headers : {Authorization:token}
                })
                console.log('memory edited added')

                return history.push('/')
      
            }
        } catch (err) {
            // window.location.href = '/';
            console.log(err)
        }
    }



    return (
        <div>
            <div className="create-note-read" >
            <h1>Read Memory</h1>
           
            <br></br>
            <div className="row " >
                <div className="read-top" >
                    <label htmlFor="title" ><h4>Title :{memory.title} </h4></label>
                    <label htmlFor="date" ><h4>Date :{memory.date}</h4></label>
                </div>
                
            </div>
          
            <div className="row" >
                <label htmlFor="content" > <h4>Content:</h4> <span>{memory.content}</span>  </label>
            </div>
           
            <div className="row" >
                
                </div>   
            </div>
               
                    
        </div>
    )
}

export default ReadMemory
