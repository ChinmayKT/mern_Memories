import React , {useState , useEffect} from 'react'
import {Link }from 'react-router-dom';
import axios from 'axios'


const Nav = ({setIslogin}) => {

    const [memory ,setMemory] = useState([])
    const [token , setToken] = useState('')
    const [name , setName ] = useState('')


    const getMemories = async(token)=> {
        const res = await axios.get('/api/memories', {
            headers : {Authorization : token}
        })
        
        setMemory(res.data)
        console.log(setMemory)
    }

    useEffect(()=>{
        const token  = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getMemories(token)
        }
    },[])


    const logoutSubmit = () =>{
        localStorage.clear()
        setIslogin(false)
    }
    return (
       <header>
        
            
           <div  class="logo" >
               <h1><Link to="/" >My Memories</Link></h1>
               
           </div>
           {/* <div class="name">Name :{memory[0]}</div> */}
           <ul>
               <li><Link to="/" >Home</Link></li>
               <li><Link to="/create">Create Memory</Link></li>
               <li onClick= {logoutSubmit} ><Link to="/">Logout</Link></li>
           </ul>

       </header>
    )
}

export default Nav
