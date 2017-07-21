import React from 'react';
import axios from 'axios';
import {url} from './config';
import {message, Spin, Card, Button} from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom';

class User extends React.Component{
  constructor(){
    super()
    this.state={
      data: null
    }
  }
  getUserInfo(loginname){
    axios.get(`${url}/user/${loginname}`)
      .then(res => this.setState({data: res.data.data}))
      .catch(err => message.error('数据加载失败'))
  }
  // componentWillReceiveProps(nextProps){
  //   // console.log(nextProps);
  //   let loginname = nextProps.match.params.loginname
  //   this.getUserInfo(loginname)
  // }
  componentDidMount(){
    var loginname = this.props.match.params.loginname;
    this.getUserInfo(loginname)
    // console.log(this.props)
  }
  render(){
    let {data} = this.state;
    console.log(data);
    // if (this.props.user.isLogin) {
    //   var loginname = this.props.user.user.loginname;
    // }
    // let loginnameUrl = this.props.match.params.loginname
    return(
      <div>
        {
          data?(
            <div>
              <img src={data.author_url} alt=""/>
              <span>{data.loginname}</span>
              <h3>{data.score}积分</h3>
              <div>
                <h3>最近创建的话题</h3>
                  {data.recent_replies.map(item=>(
                    <h3 key={item.id}>{item.title}</h3>
                  ))}
              </div>
              <div>
                <h3>最近参与的话题</h3>
                {data.recent_topics.map(item=>(
                  <span key ={item.id}>
                    <Link to={`/topic/${item.id}`}>{item.title}</Link>
                  </span>
                  
                ))}
              </div>
            </div>
          )
          :
          null
        }
      </div>
    )
  }
}
export default User