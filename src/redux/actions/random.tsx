import * as constants from '../constants'


export interface REDUCER{
    type: constants.REDUCER_t,
    data: never
}


export interface SET_TARGET{
    type: constants.SET_TARGET_t,
    data: {
        [key:string]:string | number | object | []
    }
}


export type All= REDUCER | SET_TARGET

export const reducer = () => ({type:constants.REDUCER});
export const set_target = (data:any) => ({type: constants.SET_TARGET,data:data})