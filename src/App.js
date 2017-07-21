import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './component/Home.js'
import Topic from './component/Topic'
import Header from './component/Header'
import Footer from './component/Footer'
import Message from './component/Message'
import User from './component/User'

class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<div>
					<Header />
					<div style={{minHeight:'300px'}}>
						<Route path='/' exact component={Home}/>
						<Route path='/message' component={Message}/>
						<Route path='/topic/:id' exact component={Topic}/>
						<Route path='/user/:loginname' component={User} />			
					</div>
					<p>cnode footer</p>
				</div>
			</BrowserRouter>
		)
	}
}

export default App