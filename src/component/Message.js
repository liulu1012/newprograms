import React from 'react'
import {url} from './config'
import axios from 'axios'
import {message,Spin} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'

class Message extends React.Component{
	constructor(){
		super()
		this.state ={
			data:null
		}
	}
	componentDidMount(){
		let accesstoken = sessionStorage.accesstoken
		if(accesstoken){
			axios.get(`${url}/messages?accesstoken=${accesstoken}`)
				.then(res => this.setState({data:res.data.data}))
				.catch(err => message.error('file'))
		}else{
			this.props.history.push('/')
		}	
	}
	render(){
		let {data} = this.state
		return(
			<div>
				{
					data ? (
						<div>
							<h1>未读消息</h1>
							{
								data.hasnot_read_messages.map(item=>(
									<p key={item.id}>
										{item.author.loginname}
										在文章
										<Link to={`/topic/${item.topic.id}`}>{item.topic.title}</Link>
										{item.type==='reply'?'回复':'@'}了你
										<span>{moment(item.create_at).fromNow()}</span>
									</p>						
								))
							}
							<h1>已读消息</h1>
							{
								data.has_read_messages.map(item=>(
									<p key={item.id}>
										{item.author.loginname}&nbsp;
										在文章
										<Link to={`/topic/${item.id}`}>{item.topic.title}</Link>
										{item.type==='reply'?'回复':'@'}了你
										<span>{moment(item.create_at).fromNow()}</span>
									</p>						
								))
							}
						</div>
						
					)
					:
					<div style={{textAlign:'center'}}><Spin size='large' /></div>
				}
			</div>
		)
	}
}

export default Message