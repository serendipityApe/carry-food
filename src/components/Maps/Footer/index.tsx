import {useEffect, useRef} from 'react'
import './Footer.scss'
import { store } from 'redux/store';

export default function Footer(props: any) {
    const footer=useRef<HTMLDivElement>(null);
    //监听滑动事件
    function slideEvent(){
        let startPoint:any = null;
        footer.current!.addEventListener("touchstart", function (e) {
            startPoint = e.touches[0];
        })
        footer.current!.addEventListener("touchend", function (e) {
            //e.changedTouches能找到离开手机的手指，返回的是一个数组
            let endPoint = e.changedTouches[0];
            //计算终点与起点的差值
            let x = endPoint.clientX - startPoint.clientX;
            let y = endPoint.clientY - startPoint.clientY;
            //设置滑动距离的参考值
                   let d = 100;
            if (Math.abs(x) > d) {
                if (x > 0 && (y < 10 || y > 10)) {
                    props.history.goBack();
                } else if (x < 0 && (y < 10 || y > 10)) {
                    //toLeft
                }
            }
            if (Math.abs(y) > d) {
                if (y > 0) {
                    //toBottom
                } else {
                    //toTop
                }
            }
        })
    }
    useEffect(() =>{
        slideEvent()
    },[])
    return (
        <div className="componentFooter" ref={footer}>
            <div className="content">
                <div className="targetMsg">
                    <div className="left">
                        <div className="name">
                            {store.getState().random.target.name}
                        </div>
                        <div className="address">
                            {store.getState().random.target.address}
                        </div>
                    </div>
                    <div className="right">
                        <div className="shift">
                            打开app
                        </div>
                    </div>
                </div>
                <div className="operate">

                </div>
            </div>
        </div>
    )
}
