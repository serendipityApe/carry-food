import { useState, useRef, useEffect } from 'react'
import { Map, Marker } from 'react-amap'
import './index.scss'
import 'assets/icons/iconfont.css'

import { store } from "redux/store"
import axios from 'utils/axiosConfig'
const mapKey = '30b87880a94e15ecaa3a417d877d51a6'
interface Ip {
    longitude: number,
    latitude: number
}
function Address(props: any) {
    const [myTarget, setMyTarget] = useState({name: "", location: ""});
    const infoFooter = useRef<HTMLDivElement>(null);
    const footer = useRef<HTMLDivElement>(null);
    let targetPosition: Ip = {
        longitude: 113.88176,
        latitude: 35.28299
    };
    let InitCenter: Ip = {
        longitude: Number(store.getState().location.ip.split(",")[0]),
        latitude: Number(store.getState().location.ip.split(",")[1])
    }
    const [center, setCenter] = useState(InitCenter);
    const plugins: any = [
        'MapType',   //地图切换
        {
            name: 'ToolBar',
            options: {
                visible: false,  // 不设置该属性默认就是 true
                autoPosition: false,
                locate: false,
                onCreated(ins: any) {
                    console.log(ins);
                },
            },
        }
    ]
    const sea = {
        created: async (map: any) => {
            try {
                var { data: res } = await axios.post('http://localhost:8081/map/getMap');
                var arr = res.data.data;
            }
            catch (error) {
                console.log(error)
            }

            let myWindow: any = window;
            var data: any = [];
            let icon = new myWindow.AMap.Icon({
                size: new myWindow.AMap.Size(35, 35), // 图标尺寸
                image: "http://qyaps31kd.hn-bkt.clouddn.com/flag.png" // Icon的图像
            });
            for (let i = 0; i < arr.length; i++) {
                let m = new myWindow.AMap.Marker({
                    position: [Number(arr[i].ip.split(",")[0]), Number(arr[i].ip.split(",")[1])],
                    icon: icon,
                    // offset: new myWindow.AMap.Pixel(-15, -15)
                })
                m.targetId = arr[i]._id;
                data.push(m)
            }
            // 将海量点添加至地图实例
            var count = data.length;
            var _renderClusterMarker = function (context: any) {

                //单个点的样式
                if (context.count == 1 && !context.markers[0].myFlag) {
                    for (let i = 0; i < context.markers.length; i++) {
                        context.markers[i].on('click', markerClick)
                        context.markers[i].myFlag = true;
                    }
                }
                let div = document.createElement('div');

                //聚合点样式
                if (context.count == 1 && !context.marker.targetId) {
                    context.marker.setIcon(icon);
                    context.marker.on('click', markerClick);
                    context.marker.targetId = context.markers[0].targetId;
                } else if (!context.marker.targetId) {
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
                        renderClusterMarker: _renderClusterMarker,
                        zoomOnClick: false
                    }
                );
            });
            function close(e: any) {
                console.log(e.target)
                //关闭
                if (e.target.className.indexOf("icon-chahao") !== -1) {
                    console.log("关闭")
                } else {
                    footer.current!.className="footer expend"
                    infoFooter.current!.style.height = "90vh";
                    let content=`
                    <i class="iconfont icon-Arrow-Left2"></i>
                    <div class="item detailed">
                        <div class="targetName">名字</div>
                        <div class="targetPhotos">
                            图片
                        </div>
                        <div class="targetMore">
                            <p class="targetLocation">地址：</p>
                        </div>
                    </div>
                    <div class="content comment">
                        <div class="header">
                            <div class="targetTitle">用户评论</div>
                            <div class="targetEdit">写评论</div>
                        </div>
                        <div class="targetMore">
                            <div class="commentItem">
                                <div class="userMsg">
                                    <div class="avatar">
                                        <img src="http://qyaps31kd.hn-bkt.clouddn.com/flag.png" alt="avatar" />
                                    </div>
                                    <div class="name">
                                        姓名
                                    </div>
                                </div>
                                <div class="commentMsg">
                                    <div class="describe">
                                        一大段评论
                                    </div>
                                    <div class="more">
                                        <div class="time">
                                            2021.9.01 14:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="commentItem">
                                <div class="userMsg">
                                    <div class="avatar">
                                        <img src="http://qyaps31kd.hn-bkt.clouddn.com/flag.png" alt="avatar" />
                                    </div>
                                    <div class="name">
                                        姓名
                                    </div>
                                </div>
                                <div class="commentMsg">
                                    <div class="describe">
                                        一大段评论
                                    </div>
                                    <div class="more">
                                        <div class="time">
                                            2021.9.01 14:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="targetMore">
                            <p class="targetLocation">地址：</p>
                        </div>
                    </div>
                        `
                    infoFooter.current!.innerHTML = content
                }
            }
            infoFooter.current!.onclick = close;

            async function markerClick(context: any) {
                let myCenter: Ip = {
                    longitude: context.lnglat.lng,
                    latitude: context.lnglat.lat
                }
                setCenter(myCenter);
                let content = "";
                try {
                    var { data: res } = await axios.post('http://localhost:8081/map/getTargetById', {
                        _id: context.target.targetId
                    });
                    let target = res.data[0];
                    setMyTarget({
                        name:target.targetName,
                        location: target.targetLocation
                    })
                    content = `
                        <div class="content outline">
                            <i class="iconfont icon-chahao"></i>
                            <div class="targetName">${target.targetName}</div>
                            <div class="targetMore">
                                <p class="targetLocation">地址：${target.targetLocation}</p>
                            </div>
                        </div>
                    `;
                }
                catch (error) {
                    console.log(error)
                }
                infoFooter.current!.innerHTML = content
                // console.log(context)  //坐标1
                // context.target.getPosition()  //2
            }
        }
    }
    useEffect(() => {
        console.log(props)
    })
    /* 
    //是根据state修改dom效率高还是直接在js里改效率高呢？
    switch(footerState) {
        case "click":
            return (
                <div className="mapContainer">
            <Map version="1.4.16" events={sea} plugins={plugins} center={center} amapkey={mapKey}
                zoom={15}>
            </Map>
            <div className="footer">
                    <div className="infoFooter">
                        <div className="content" ref={infoFooter}>
                        <i className="iconfont icon-chahao"></i>
                            <div className="targetName">{myTarget.name}</div>
                            <div className="targetMore">
                                <p className="targetLocation">地址：{myTarget.location}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">

                    </div>
                </div>
            </div>
                )
        default:
            return (
                <div className="mapContainer">
            <Map version="1.4.16" events={sea} plugins={plugins} center={center} amapkey={mapKey}
                zoom={15}>
            </Map>
            <div className="footer">
                    <div className="infoFooter">
                        <div className="content" ref={infoFooter}>

                        </div>
                    </div>
                    <div className="bottom">

                    </div>
                </div>
            </div>
            )
    } */
    return (
        <div className="mapContainer">
            <Map version="1.4.16" events={sea} plugins={plugins} center={center} amapkey={mapKey}
                zoom={15}>
            </Map>
            <div className="footer" ref={footer}>
                    <div className="infoFooter" ref={infoFooter}>
                        
                    </div>
                    <div className="bottom">

                    </div>
                </div>
        </div>
    )
}
export default Address;