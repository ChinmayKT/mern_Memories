import React , {useState , useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const CreateMemory = () => {

    const [memory ,setMemory] = useState({
        title : '',
        content : '' ,
        date : ''
    })

    const history =  useHistory()

    const onChangeInput =  (e) => {
        const {name , value} = e.target;
        setMemory({...memory , [name]: value})
    }

    const createMemory = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title , content , date} = memory;
                const newMemory = {
                    title , content , date
                }
                console.log(newMemory)
                await axios.post('/api/memories', newMemory , {
                    headers : {Authorization:token}
                })
                console.log('memory added')

                return history.push('/')
              
            }
        } catch (err) {
            window.location.href = '/';
        }
    }



    return (
        <div className="create-note" >
            <h2>Create Memory</h2>
            <form onSubmit={createMemory} autoComplete ="off"  >
                <div className="row" >
                    <label htmlFor="title" >Title</label>
                    <input type="text" value={memory.title} id="title" placeholder="Title"
                    name = "title" required onChange = {onChangeInput} maxlength = "36"  />
                </div>

                <div className="row" >
                    <label htmlFor="content" >content</label>
                    <textarea type="text" value={memory.content} id="content" placeholder="Content"
                    name = "content" required row="10" onChange={onChangeInput}/>
                </div>

                <div className="row" >
                    <label htmlFor="date" >Date :{memory.date}</label>
                    <input type="date" value={memory.date} id="title" placeholder="date"
                    name = "date" required onChange = {onChangeInput} />
                </div>

                <button  type="submit" >Save</button>
            </form>
            
        </div>
    )
}

export default CreateMemory
