import * as constants from '../constants'
import {StoreUser} from '../../types'

export interface SET_USER{
    type:constants.SET_USER_t,
    data:StoreUser
}
export type All= SET_USER

export const set_user=(data:StoreUser):SET_USER => ({type:constants.SET_USER,data})


