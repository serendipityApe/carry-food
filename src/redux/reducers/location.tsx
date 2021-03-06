/* 
	1.该文件是用于创建一个为location组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import {SET_IP} from '../constants'
import {StoreLocation} from '../../types'
import {All} from '../actions/location'

const initState:StoreLocation = {ip:'',local:'定位中...',adcode:''} //初始化状态
export default function ipReducer(preState:StoreLocation=initState,action:All):StoreLocation{
	// console.log('countReducer@#@#@#');
	//从action对象中获取：type、data
	const {type,data} = action
	//根据type决定如何加工数据
	switch (type) {
        case SET_IP:
            return data
		default:
			const exhaustiveCheck:never =type   //走default时会报错   类型“xxx”的参数不能赋给类型“never”的参数。来确保actions的类型正确
			return preState
	}
}