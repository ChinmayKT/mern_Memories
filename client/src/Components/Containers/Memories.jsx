import React from 'react'
import Header from '../Memories/Nav'
import Home from '../Memories/Home'
import CreateMemory from '../Memories/CreateMemory'
import EditMemory from '../Memories/EditMemory'
import ReadMemory from '../Memories/ReadMemory'
import { BrowserRouter as Router , Route } from 'react-router-dom'


const Memories = ({setIslogin}) => {
    return (
      <Router>
          <div className="notes-page" >
             <Header setIslogin= {setIslogin} />
             <section>
                 <Route exact path="/" component={Home} exact />
                 <Route exact path="/create" component={CreateMemory} exact />
                 <Route  exact path="/edit/:id" component={EditMemory} exact />
                 <Route exact path = "/read/:id" component= {ReadMemory} exact />
             </section>
            
          </div>
      </Router>
    )
}

export default Memories
