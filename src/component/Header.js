import React from 'react'
import axios from 'axios'
import {url} from './config'
import {Link} from 'react-router-dom'
import {Button,Modal,Input,message,Menu, Dropdown,Avatar,Badge} from 'antd'

class Header extends React.Component{
	constructor(){
		super()
		this.state={
			isLogin:false,
			visible:false,
			confirmLoading:false,
			input:'aa0ea0f5-18b4-426d-8d30-a8c47576cf8b',
			user:null,
			messageCount:null
		}
	}
	handleOk(){
		this.setState({confirmLoading:true})
		let accesstoken = this.state.input.trim()
		axios.post(`${url}/accesstoken`,{accesstoken})
			.then(res => {
				message.success('登录成功')
				this.setState({
					visible:false,
					isLogin:true,
					confirmLoading:false,
					input:'aa0ea0f5-18b4-426d-8d30-a8c47576cf8b',
					user:res.data
				})
				sessionStorage.accesstoken = accesstoken
				this.getMessage(accesstoken)
			})
			.catch(err => {
				message.error('登录失败，请重试')
				this.setState({
					confirmLoading:false,
					input:''
				})
			})
	}
	getMessage(accesstoken){
		axios.get(`${url}/message/count?accesstoken=${accesstoken}`)
			.then(res=>this.setState({messageCount:res.data.data}))
			.catch(err=>console.log(err))
	}
	handleLogout(){
		this.setState({
			isLogin:false,
			user:null
		})
		sessionStorage.removeItem('accesstoken')
	}
	render(){
		let {isLogin,visible,input,confirmLoading,user,messageCount} = this.state
		const menu = !isLogin ? <p>111</p> : (
			<Menu>
				<Menu.Item>
					<h3>{user.loginname}</h3>
				</Menu.Item>
				<Menu.Item>
					<Link to='/'>用户中心</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to='/message'>消息中心</Link>
				</Menu.Item>
				<Menu.Item>
					<Button type='danger' onClick={this.handleLogout.bind(this)}>退出</Button>
				</Menu.Item>
			</Menu>
		)
		return(
			<header className='header'>
				<Link to='/'>cnode</Link>
				{ isLogin ?
					<Dropdown overlay={menu}>
						<Badge count={messageCount}>
							<Avatar src={user.avatar_url} />
						</Badge>
					</Dropdown>
					:
					<div>
						<Button type='primary' onClick={()=>this.setState({visible:true})}>登录</Button>
						<Modal
		          title="登录"
		          visible={visible}
		          onOk={this.handleOk.bind(this)}
		          onCancel={()=>this.setState({visible:false})}
		          confirmLoading={confirmLoading}
		          cancelText='取消'
		          okText='登录'
		        >
		          <Input placeholder="accesstoken" value={input} onChange={e=>this.setState({input:e.target.value})}/>
		        </Modal>						
					</div>
				}
			</header>
		)
	}
}

export default Header