import React from 'react'
import {Spin,Avatar} from 'antd'
import {Link} from 'react-router-dom'

class ShowTopics extends React.Component{
	render(){
		let {data} = this.props
		let tabs = {
			ask: '问答',
			job: '招聘',
			share: '分享'
		}
		console.log(data)
		return(
			<div className='topics'>
				{
					data.length===0?<div><Spin size="large" /></div>:
					data.map(item=>(
						<div key={item.id} className='topic'>
							 <Link to={`/user/${item.author.loginname}`}><Avatar src={item.author.avatar_url} shape="square"/></Link>&nbsp;&nbsp;
							 	<span className='tab'>{item.top?'置顶':item.good?'精华':tabs[item.tab]}</span>
							 	<span style={{fontWeight:'bold',fontSize:'16px'}}>{item.reply_count}</span>
							 	<span>/{item.visit_count}</span>&nbsp;&nbsp;
								
								<h3 title={item.title}><Link to={`/topic/${item.id}`}>{item.title}</Link></h3>
						</div>
					))
				}
			</div>
		)
	}
}

export default ShowTopics