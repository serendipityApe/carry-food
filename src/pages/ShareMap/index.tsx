import React from 'react'
import { Map, Marker } from 'react-amap'
import './index.scss'

import { store } from "redux/store"
import axios from 'utils/axiosConfig'
const mapKey = '30b87880a94e15ecaa3a417d877d51a6'

function Address(props: any) {
    let targetPosition: any = {
        longitude: "113.88176",
        latitude: "35.28299"
    };
    let InitCenter: any = {
        longitude: store.getState().location.ip.split(",")[0],
        latitude: store.getState().location.ip.split(",")[1]
    }
    const [center, setCenter] = React.useState(InitCenter);
    const plugins: any = [
        'MapType',   //地图切换
        {
            name: 'ToolBar',
            options: {
                visible: true,  // 不设置该属性默认就是 true
                autoPosition: false,
                locate: false,
                onCreated(ins: any) {
                    console.log(ins);
                },
            },
        }
    ]
    let sea = {
        created: async (map: any) => {
            try{
                var {data:res} = await axios.post('http://localhost:8081/map/getMap');
                var arr=res.data.data;
            }
            catch(error){
                console.log(error)
            }
            
            let myWindow: any = window;
            var data: any = [];
            let icon = new myWindow.AMap.Icon({
                size: new myWindow.AMap.Size(35, 35), // 图标尺寸
                image: "http://qyaps31kd.hn-bkt.clouddn.com/flag.png" // Icon的图像
            });
            for (let i = 0; i < arr.length; i++) {
                let m=new myWindow.AMap.Marker({
                    position: [Number(arr[i].ip.split(",")[0]), Number(arr[i].ip.split(",")[1])],
                    icon: icon,
                    // offset: new myWindow.AMap.Pixel(-15, -15)
                })
                m.targetId=arr[i]._id;
                data.push(m)
            }
            // 将海量点添加至地图实例
            var count = data.length;
            var _renderClusterMarker = function (context: any) {
                if (context.count == 1 && !context.markers[0].myFlag) {
                    for (let i = 0; i < context.markers.length; i++) {
                        context.markers[i].on('click', markerClick)
                        context.markers[i].myFlag = true;
                    }
                }
                let div = document.createElement('div');
                if (context.count == 1) {
                    context.marker.setIcon(icon);
                    context.marker.on('click', markerClick);
                    context.marker.targetId=context.markers[0].targetId;
                } else {
                    var factor = Math.pow(context.count / count, 1 / 18);
                    var Hue = 180 - factor * 180;
                    var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
                    var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
                    var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
                    var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
                    div.style.backgroundColor = bgColor;
                    var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
                    div.style.width = div.style.height = size + 'px';
                    div.style.border = 'solid 1px ' + borderColor;
                    div.style.borderRadius = size / 2 + 'px';
                    div.style.boxShadow = '0 0 1px ' + shadowColor;
                    div.innerHTML = context.count;
                    div.style.lineHeight = size + 'px';
                    div.style.color = fontColor;
                    div.style.fontSize = '14px';
                    div.style.textAlign = 'center';
                    context.marker.setOffset(new myWindow.AMap.Pixel(-size / 2, -size / 2));
                    context.marker.setContent(div)
                }
            };
            //利用styles属性修改点聚合的图标样式
            var cluster: any;
            //添加聚合组件
            map.plugin(["AMap.MarkerClusterer"], function () {
                cluster = new myWindow.AMap.MarkerClusterer(
                    map,     // 地图实例
                    data,    // 海量点组成的数组
                    {
                        gridSize: 120,
                        minClusterSize: 1,
                        renderClusterMarker: _renderClusterMarker ,
                        zoomOnClick : false
                    }
                );
            });
            function markerClick(context: any) {
                console.log(context)  //坐标1
                context.target.getPosition()  //2
                if (context.target.imgUrl == null) {
                    var content = [
                        "<div style='display:flex;height:80px;font-size:14px'>",
                        "<div style='width:80px;height:60px'>",
                        "<img style='width:100%;height:100%' src='https://smsycs.hxxpl.com.cn/2019/201912191545286185117.png'></div>",
                        "<p style='padding-left:5px;margin-top:15px'>地址：" +
                        context.target.address +
                        "</p>",
                        "</div>"
                    ];
                } else {
                    var content = [
                        "<div style='display:flex;height:80px;font-size:14px'>",
                        "<div style='width:80px;height:60px'>",
                        "<img style='width:100%;height:100%' src='" +
                        context.target.imgUrl +
                        "'></div>",
                        "<p style='padding-left:5px;margin-top:15px'>地址：" +
                        context.target.address +
                        "</p>",
                        "</div>"
                    ];
                }
                // let title = context.target.title;
                let title = "<div style='font-size:16px'>" + context.target.title + "</div>";
                var infoWindow = new myWindow.AMap.InfoWindow({
                    content: title + content.join("<br>")
                });
                infoWindow.open(map, [
                    context.target.getPosition().lng,
                    context.target.getPosition().lat
                ]);
            }
        }
    }
    React.useEffect(() => {
        console.log(props)
    })
    return (

        <div className="mapContainer">
            <Map version="1.4.16" events={sea} plugins={plugins} center={center} amapkey={mapKey}
                zoom={15}>
            </Map>
        </div>
    )
}
export default Address;