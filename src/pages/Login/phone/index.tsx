import React, { Component } from 'react'
import {Button, InputItem, Toast} from 'antd-mobile'
import './index.scss'
import {Link} from 'react-router-dom'

interface State{
    hasError:boolean,
    phone:string
}
export default class index extends Component<any,State> {
    state = {
        hasError: false,
        phone: '',
      }
    onErrorClick = () => {
    if (this.state.hasError) {
        Toast.info('请输入正确格式');
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
        phone,
    });
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
                    <Button className="btn" type="primary" >下一步</Button>
                </div>
                <div className="footer"><Link className="changeType" to="/login/?type=1" href="">使用账号密码登录</Link></div>
            </div>
        )
    }
}
