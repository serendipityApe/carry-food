/* 
	该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错
*/
export const SET_IP='set_ip';
export type SET_IP_t = typeof SET_IP;

export const SET_USER = 'set_user';
export type SET_USER_t = typeof SET_USER;