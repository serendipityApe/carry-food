import React from 'react'
import { Map, Marker } from 'react-amap'
import './index.scss'

import { store } from "redux/store"
import ToSelf from "components/Maps/ToSelf"
import Avatar from 'components/Avatar/Avatar'
import Footer from 'components/Maps/Footer'
const mapKey = '30b87880a94e15ecaa3a417d877d51a6'

function Address(props: any) {
  let targetPosition = {
    longitude: store.getState().random.target.location.split(",")[0],
    latitude: store.getState().random.target.location.split(",")[1]
  };
  let InitCenter: any = {
    longitude: store.getState().location.ip.split(",")[0],
    latitude: store.getState().location.ip.split(",")[1]
  }
  const [center, setCenter] = React.useState(InitCenter);
  const plugins: any = [
    'MapType',   //地图切换
    // 'Scale',   //尺子
    // 'OverView',
    // 'ControlBar', // v1.1.0 新增
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
  //重新赋初始值,改变当前视角为我自己
  const toSelf = () => {
    let myInitCenter: any = {
      longitude: store.getState().location.ip.split(",")[0],
      latitude: store.getState().location.ip.split(",")[1]
    }
    setCenter(myInitCenter);
  }
  React.useEffect(() => {
    console.log(props)
  })
  return (
    <div className="mapContainer">
      <Map plugins={plugins} center={center} amapkey={mapKey}
        zoom={15}>
        <Marker position={targetPosition} />
        <Marker position={center} render={Avatar}></Marker>
        <ToSelf ToSelf={toSelf} />
      </Map>
	  <Footer history={props.history}/>
    </div>
  )
}
export default Address;