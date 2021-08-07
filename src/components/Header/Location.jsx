import React, { Component } from 'react'

import './index.scss'
import {location} from '../../assets/js/location'

export default class Location extends Component {
    componentDidMount(){
        this.getLocation()
    }
    getLocation() {
        // let _that = this;
        let geolocation = location.initMap("map-container"); //定位
         //eslint-disable-next-line
        AMap.event.addListener(geolocation, "complete", result => {
            console.log(result)
            /* this.locationMsg=result.formattedAddress;
            this.position.Q=result.position.Q;
            this.position.R=result.position.R
            this.position.adcode=result.addressComponent.abcode;
            this.$emit('location', ''+this.position.R+','+this.position.Q+'')   //向父组件传递当前坐标 */
        });
         //eslint-disable-next-line
        AMap.event.addListener(geolocation, 'error', (err)=>{
            console.log(err)
            /* console.log('定位错误')
            this.$toast('定位失败，请手动选择位置')
            setTimeout(()=>{

                this.show=true;
            },2000) */
        });
    }
    render() {
        return (
            <div className="location">
                河南省新乡市红旗渠
            </div>
        )
    }
}
