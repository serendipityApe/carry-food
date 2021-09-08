/* 
	该文件专门为location组件生成action对象
*/
import * as constants from '../constants'
import {StoreLocation} from '../../types'
export interface SET_IP {
	type:constants.SET_IP_t,
	data:StoreLocation
}
export type All = SET_IP

//同步action，就是指action的值为Object类型的一般对象
export const set_ip = (data:StoreLocation) => ({type:constants.SET_IP,data})