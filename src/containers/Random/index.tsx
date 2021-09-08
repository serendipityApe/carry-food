import {useRef,useState} from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { RouterProps } from 'react-router';
import {connect} from 'react-redux'

//引入action
import {
	reducer,
    set_target
} from '../../redux/actions/random'
import { store } from "redux/store"
import {StoreState} from '../../types'

import randomImg from "assets/imgs/wan.png"
import small from "assets/imgs/small.png"
import Upload from 'components/Upload'


interface Props extends RouterProps{
    reducer: Function,
    set_target: Function
}
// UI组件
function Random(props: Props) {
    //是否抽取过食物
    const [isRandom,setIsRandom]=useState(Object.keys(store.getState().random.target).length > 0);
    //是否正在抽取食物
    const [radoming,setRandoming] = useState(false); 
    const randomRef = useRef<HTMLImageElement>(null);

    function start() {
        if(!radoming){
           
            if (!store.getState().location.ip || store.getState().location.ip === '') {
                Toast.info('请先确定您的位置',1);
            } else if(store.getState().random.frequency >0){
                Toast.info(`今日刷新次数已用尽 ${store.getState().random.frequency}/3`,1);
            }else{
                setRandoming(true);
                setIsRandom(false);
                let min = 0, max1 = 5;
                let rand1 = Math.round(Math.random() * (max1 - min)) + min;
                if(randomRef.current) randomRef.current!.className = "swing";
                axios.get('gaode/v3/place/around', {
                    params: {
                        key: '30b87880a94e15ecaa3a417d877d51a6',
                        keywords: '餐馆',
                        radius: '1000',
                        location: store.getState().location.ip,
                        sortrule: 'weight',
                        offset: '25',
                        page: rand1,
                    }
                })
                .then(function (response) {
                    if (response.data.pois.length === 0) {
                        Toast.info('暂无数据',1000);
                        if(randomRef.current) randomRef.current!.className = "";
                        return false;
                    }
                    let max2 = response.data.pois.length;
                    let rand2 = Math.round(Math.random() * (max2 - min)) + min;  //随机一个数字
                    let randFood = response.data.pois[rand2];
                    while (!randFood.photos || randFood.photos.length === 0 || !randFood.name) {
                        rand2 = Math.round(Math.random() * (max2 - min)) + min;
                        randFood = response.data.pois[rand2];
                    }
                    setTimeout(() => {
                        console.log(randFood);
                        props.reducer();
                        props.set_target(randFood);
                        setIsRandom(true);
                        setRandoming(false);
                    }, 1500);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }else{
            console.log("抽取中")
        }   
    }
    function toMap() {
        props.history.push({
            pathname: '/map',
        });
    }
    return (
        <div>
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                    <Card.Header
                        title="抽取食物"
                        thumb={small}
                        extra={<span>吃完评论</span>}
                    />
                    <Card.Body>
                        <div className="random">
                            {isRandom
                                ? (<div>
                                    <img src={store.getState().random.target.photos[0].url} alt="target"></img>
                                    <div className="targetFoodName">{store.getState().random.target.name}</div> 
                                    </div>)
                                : <img onClick={start} className={radoming ? 'swing' : ''} ref={randomRef} alt="random" src={randomImg}></img>}
                        </div>
                    </Card.Body>
                    <Card.Footer content={isRandom ? <span onClick={start}>刷新{store.getState().random.frequency}/3</span> : ""} extra={isRandom ? <div onClick={toMap}>到店</div> : ""} />
                </Card>
                <WhiteSpace size="lg" />
            </WingBlank>
        </div>
    )
}


//使用connect()()创建并暴露一个Location的容器组件
export default connect(
	(state:StoreState) => {
        return {
            frequency: state.random.frequency,
            target: state.random.target
        }
    },
	{reducer,set_target}
)(Random)
