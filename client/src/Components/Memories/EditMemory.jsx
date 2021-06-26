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
            console.log("edit", token)
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
        <div className="create-note" >
            <h2>Edit Memory</h2>
            <form onSubmit={editMemory} autoComplete ="off"  >
                <div class="row" >
                    <label htmlFor="title" >Title</label>
                    <input type="text" value={memory.title} id="title" placeholder="title"
                    name = "title" onChange = {onChangeInput} maxlength = "36" />
                </div>

                <div class="row" >
                    <label htmlFor="content" >content</label>
                    <textarea type="text" value={memory.content} id="content" placeholder="content"
                    name = "content"  row="10" onChange={onChangeInput} maxlength = "1200" />
                </div>

                <div class="row" >
                    <label htmlFor="date" >Date :{memory.date}</label>
                    <input type="date" value={memory.date} id="title" placeholder="date"
                    name = "date" onChange = {onChangeInput} />
                </div>

                <button  type="submit" >Save</button>
            </form>
            
        </div>
    )
}

export default ReadMemory
