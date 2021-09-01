import { Component } from 'react'
import {Button, InputItem, Toast} from 'antd-mobile'
import {Link,withRouter} from 'react-router-dom'

//引入action
import {
	set_user
} from '../../redux/actions/user'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'
import {StoreUser,StoreState} from '../../types'
//定义UI组件
//消息提示框
function showToast(msg:string,time?:number){
    Toast.info(msg, time || 1);
}

interface State{
    hasError:boolean,
    hasErrorPs:boolean,
    phone:string,
    password:string,
}
class User extends Component<any,State> {
    state = {
        hasError: false,     //phone格式判断
        hasErrorPs:false,  //ps格式判断
        phone: '',
        password:'',
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入正确格式');
        }
        if(this.state.hasErrorPs){
            Toast.info('密码过短或为空');
        }
    }
    onChange = (phone:string) => {
        if (phone.replace(/\s/g, '').length < 11) {
            this.setState({
            hasError: true,
            });
        } else {
            this.setState({
            hasError: false,
            });
        }
        this.setState({
            phone
        });
    }
    onChangePassword = (password:string) => {
        if (password.length < 3) {
            this.setState({
            hasErrorPs: true,
            });
        } else {
            this.setState({
            hasErrorPs: false,
            });
        }
        this.setState({
            password,
        });
    }
    login = async () =>{
        let msg={
            phone:this.state.phone.replace(/\s/g, ''),  //去空格
            password:this.state.password
        }
        try {
			const response= await fetch(`http://localhost:8081/users/login`,{
                method:'post',
                body: JSON.stringify(msg),
                headers:{
                   'Content-Type': 'application/json'
                },
            })
            console.log(response)
			const data = await response.json()
            if(response.ok){
                //真正成功
                if(data.code === 0){
                    localStorage.setItem('access_token',"Bearer " +data.data.token);
                }
                let storeUser={
                    isLogin: true,
                    msg:data.data.data
                }
                this.props.set_user(storeUser);
                showToast('登录成功');
                setTimeout(() => {
                    this.props.history.push("/index");
                }, 500);
            }else{
                //请求成功，接口错误
                console.log(data.msg)
                showToast(data.msg)
            }
			console.log(data);
		} catch (error) {
            //请求失败
			console.log('请求出错',error);
            showToast(error.msg)
		}
    }
    render() {
        return (
            <div>
                <div className="content">
                    <InputItem
                        type="phone"
                        placeholder="请输入手机号"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.phone}
                    ></InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        error={this.state.hasErrorPs}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChangePassword}
                        value={this.state.password}
                    ></InputItem>
                    <Button className="btn" type="primary" onClick={this.login} >登录</Button>
                </div>
                <div className="footer"><Link className="changeType" to="/login/?type=0" href="">使用手机号登录</Link></div>
            </div>
        )
    }
}
//使用connect()()创建并暴露一个User的容器组件
export default connect(
	(state:StoreState) => {
        console.log(state)
        return {

        }
    },
	{set_user}
)(withRouter(User))