import React,{useRef,useState,useEffect} from 'react'
import {Route} from 'react-router-dom'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import {Toast} from 'antd-mobile'
import './index.scss'

import randomImg from "assets/imgs/wan.png"
import {Link} from 'react-router-dom'
import {store} from "redux/store"
import Header from '../../components/Header/Header'
import Upload from 'components/Upload'

import axios from 'utils/axiosConfig';
interface props{
    routers:object[],
    history:any
}

function Index(props:props){
    let {routers} = props;
    console.log(props)
    const [isRodom,setIsRodom] = useState(false);
    const [targetFood,setTargetFood] = useState({name:"",url:"",ip:''});
    const randomRef:any=useRef(null);

    function start(){
        if(!store.getState().location.ip || store.getState().location.ip === ''){
            Toast.info('请先确定您的位置');
        }else{
            let min = 0,max1=5;
            let rand1=Math.round(Math.random()*(max1-min))+min;
            randomRef.current.className="swing";
            axios.get('gaode/v3/place/around', {
                params: {
                    key:'30b87880a94e15ecaa3a417d877d51a6',
                    keywords:'餐馆',
                    radius:'1000',
                    location:store.getState().location.ip,
                    sortrule:'weight',
                    offset:'25',
                    page: rand1,
                }
            })
            .then(function (response) {
                console.log(response);
                if(response.data.pois.length === 0){
                    Toast.info('暂无数据');
                    randomRef.current.className="";
                    return false;
                }
                let max2=response.data.pois.length;
                let rand2=Math.round(Math.random()*(max2-min))+min;  //随机一个数字
                let randFood=response.data.pois[rand2];
                while(!randFood.photos || randFood.photos.length===0 || !randFood.name){
                    rand2 = Math.round(Math.random()*(max2-min))+min;
                    randFood=response.data.pois[rand2];
                }
                setTimeout(() => {
                    console.log(randFood);
                    setIsRodom(true);
                    
                    setTargetFood({
                        url:randFood.photos[0].url,
                        name:randFood.name,
                        ip: randFood.location
                    });
                    // randomRef.current.className="";
                }, 1500);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
    }
    function toMap(){
        props.history.push({
            pathname: '/map',
            state: {
                ip:targetFood.ip,
                name:targetFood.name
            }
        });
    }
    async function uploadToken() {
        let res = await axios.get("http://localhost:8081/uploadToken");
        try{
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        uploadToken()
    },[])
    return(
        <div>
            <Header/>
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                <Card.Header
                    title="抽取食物"
                    thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    extra={<span>this is extra</span>}
                />
                <Card.Body>
                <div className="random">
                        { isRodom 
                        ? (<div><img src={targetFood.url} alt="target"></img> <div className="targetFoodName">{targetFood.name}</div> </div>)
                        : <img onClick={start}  ref={randomRef} alt="random" src={randomImg}></img> }
                        
                        {routers.map((r:any) => {
                            return <Route key={r.path} exact={r.exact} path={r.path} component={r.component}/>
                        })}
                        <Upload 
                        action="http://upload-z2.qiniup.com"
                        name="file"
                        data={{token: "c4XQ-rnJ6K4ZxcYSDfAF2ndHoKu7cVdRnKjycFHa:10vKmRxpKgzGOW25jLZsXlV070k=:eyJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6XCIkKGtleSlcIixcImhhc2hcIjpcIiQoZXRhZylcIixcImZzaXplXCI6JChmc2l6ZSksXCJidWNrZXRcIjpcIiQoYnVja2V0KVwiLFwibmFtZVwiOlwiJCh4Om5hbWUpXCJ9Iiwic2NvcGUiOiJjYXJyeS1mb29kIiwiZGVhZGxpbmUiOjE2MzAzMzI5NzB9"}}
                        >
                    <div>
                        上传
                    </div>
                </Upload>
                    </div>
                
                </Card.Body>
                <Card.Footer content={isRodom ? "刷新3/3" : ""} extra={isRodom ? <div onClick={toMap}>到店</div> : ""} />
                </Card>
                <WhiteSpace size="lg" />
            </WingBlank>
        </div>
    )
}
export default Index;