import React, { Component } from 'react'
import {Button, InputItem, Toast} from 'antd-mobile'
import './index.scss'
import Bg from '../../components/Login/Login_bg'

interface State{
    hasError:boolean,
    value:string
}
export default class index extends Component<any,State> {
    state = {
        hasError: false,
        value: '',
      }
    onErrorClick = () => {
    if (this.state.hasError) {
        Toast.info('请输入正确格式');
    }
    }
    onChange = (value:string) => {
    if (value.replace(/\s/g, '').length < 11) {
        this.setState({
        hasError: true,
        });
    } else {
        this.setState({
        hasError: false,
        });
    }
    this.setState({
        value,
    });
    }
    render() {
        return (
            <div className="login">
                <Bg></Bg>
                <div className="content">
                    <InputItem
                        type="phone"
                        placeholder="请输入手机号"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.value}
                    ></InputItem>
                    <Button className="btn" type="primary" >下一步</Button>
                </div>
                    <div className="footer"><a className="changeType" href="">使用账号密码登录</a></div>
            </div>
        )
    }
}
