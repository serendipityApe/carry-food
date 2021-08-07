import React, { Component } from 'react'
import axios from 'axios'

//引入action
import {
	set_ip
} from '../../redux/actions/location'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'
import {StoreLocation,StoreState} from '../../types'

import './index.scss'
import {location} from '../../assets/js/location'
//定义UI组件
interface Props extends StoreLocation{
    set_ip:(data:StoreLocation) => void,
    extra?:string //手动选择地址数据,
    onClick?:() => Function   //selectAddress组件弹出函数
}
interface State {
    amap:boolean
}
declare let AMap: any;
class Location extends Component<Props,State> {
    state={amap:true}
    componentDidMount(){
        this.getLocation()
    }
    componentDidUpdate(prevProps:Props,prevState:State){
        if(!this.state.amap && prevProps.extra !== this.props.extra){
            this.freeLocation();
        }
    }
    getLocation() {
        // let _that = this;
        let geolocation = location.initMap("map-container"); //定位
         //eslint-disable-next-line
        AMap.event.addListener(geolocation, "complete", (result?:any) => {
            console.log(result)
            let ipMsg={
                ip:`${result.position.lng},${result.position.lat}`,
                local:result.addressComponent.city,
                adcode:result.addressComponent.abcode
            }
            this.props.set_ip(ipMsg);
            /* this.locationMsg=result.formattedAddress;
            this.position.Q=result.position.Q;
            this.position.R=result.position.R
            this.position.adcode=result.addressComponent.abcode;
            this.$emit('location', ''+this.position.R+','+this.position.Q+'')   //向父组件传递当前坐标 */
        });
         //eslint-disable-next-line
        AMap.event.addListener(geolocation, 'error', (err?:any)=>{
            console.log(err)
            let ipMsg={
                local: '定位失败',
                adcode: '10000',
                ip: '116.2329,39.5411'
            }
            this.props.set_ip(ipMsg);
            this.setState({amap:false})
            /* console.log('定位错误')
            this.$toast('定位失败，请手动选择位置')
            setTimeout(()=>{

                this.show=true;
            },2000) */
        });
    }
    //手动选择定位
    async freeLocation() {
        let arr=this.props.extra!.split(',')
        let city=arr[arr.length-1]
        let ipMsg
        try{
            const {data:res} =await axios.get(`https://restapi.amap.com/v3/config/district?key=30b87880a94e15ecaa3a417d877d51a6&keywords=${city}&subdistrict=0&extensions=base`)
            ipMsg={
                local: city,
                adcode: res.districts[0].adcode,
                ip: res.districts[0].center
            }
            console.log(res)
        }catch(err){
            console.log(err)
            ipMsg={
                local: city,
                adcode: '10000',
                ip: '116.2329,39.5411'
            }
        }
        
        this.props.set_ip(ipMsg);
    }
    render() {
        console.log(this.props)
        return (
            <div className="location" onClick={this.props.onClick}>
                {this.props.local}
            </div>
        )
    }
}

//使用connect()()创建并暴露一个Location的容器组件
export default connect(
	(state:StoreState) => {
        console.log(state)
        return {
            ip: state.location.ip,
            local: state.location.local,
            adcode: state.location.adcode
        }
    },
	{set_ip:set_ip}
)(Location)

