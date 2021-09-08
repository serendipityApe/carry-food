/* 
	1.该文件是用于创建一个为location组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import {REDUCER,SET_TARGET} from '../constants'
import {StoreRandom} from '../../types'
import {All} from '../actions/random'

const initState:StoreRandom = {frequency : 3,target: {}} //初始化状态

export default function ipReducer(preState:StoreRandom=initState,action:All):StoreRandom{
	//从action对象中获取：type、data
	const {type,data} = action
	//根据type决定如何加工数据
	switch (type) {
        case REDUCER:
            return {...preState,frequency: preState.frequency-1}
		case SET_TARGET:
			return {...preState,target:data}
		default:
			const exhaustiveCheck:never =type   //走default时会报错   类型“xxx”的参数不能赋给类型“never”的参数。来确保actions的类型正确
			return preState
	}
}