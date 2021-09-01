import { Component } from 'react'
import {Toast} from 'antd-mobile'
import qs from 'querystring'
import LoginPs from 'containers/LoginPs'
import LoginPhone from './phone'

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
        console.log(this.props)
        const {search} = this.props.location;
        const {type} = qs.parse(search.slice(1));
        if(type === '0'){
            return (
                <div className="login">
                    <Bg></Bg>
                    <LoginPhone />
                </div>
            )
        }else{
            return (
                <div className="login">
                    <Bg></Bg>
                    <LoginPs />
                </div>
            )
        }
        
    }
}
