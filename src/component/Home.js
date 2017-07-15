import React from 'react'
import axios from 'axios'
import {url} from './config.js'
import {Tabs,Button,BackTop,Spin,message} from 'antd'
import ShowTopics from './ShowTopics'
import Topic from './Topic'

const TabPane = Tabs.TabPane;

class Home extends React.Component{
	constructor(){
		super()
		this.state = {
			data:{
				all:{topic:[],page:1},
				good:{topic:[],page:1},
				share:{topic:[],page:1},
				ask:{topic:[],page:1},
				job:{topic:[],page:1},
			},
			tab:'all'
		}
	}
	getData(tab,page){
		axios.get(`${url}/topics?limit=20&tab=${tab==='all'?'':tab}&page=${page}`)
			.then(res => {
				let newData = this.state.data
				newData[tab].topic = [...newData[tab].topic,...res.data.data]
				newData[tab].page = page
				this.setState({data:newData})
			})
			.catch( err => message.error('数据请求失败'))
	}
	componentDidMount(){
		this.getData('all',1)
	}
	handleChange(key){
		this.setState({tab:key})
		// console.log(key)
		if (this.state.data[key].topic.length===0) {
			this.getData(key, 1)
			}else{
			return
		}
	}
	loadMore(tab){
		this.getData(tab,this.state.data[tab].page+1)
	}
	render(){
		let {data,tab} = this.state
		return(
			<div>
				{
					data?(
						<div>
							<Tabs defaultActiveKey="all" onChange={this.handleChange.bind(this)}>
								<TabPane tab="全部" key="all">
									<ShowTopics data={data.all.topic}/>
								</TabPane>
								<TabPane tab="精华" key="good">
									<ShowTopics data={data.good.topic}/>
								</TabPane>
								<TabPane tab="分享" key="share">
									<ShowTopics data={data.share.topic}/>
								</TabPane>
								<TabPane tab="问答" key="ask">
									<ShowTopics data={data.ask.topic}/>
								</TabPane>
								<TabPane tab="招聘" key="job">
									<ShowTopics data={data.job.topic}/>
								</TabPane>
							</Tabs>
							<Button type="primary" onClick = {this.loadMore.bind(this,tab)} style={{width:'100%'}}>加载更多</Button>
							<BackTop />
						</div>
						
					):<div><Spin size="large" /></div>
				}
			</div>
		)
	}
}

export default Home

//c34822ec-4ad8-4a71-b5b0-718e5b5b3a16