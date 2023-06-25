 import { getAction,postAction,putAction,deleteAction,httpAction } from "@/utils/manage";

 /**
 * @param  {String}  path     路径
 * @param  {Object}  data     参数
 * @param  {Boolean} loading  全局加载状态 默认false q
 * @param  {string}  text     加载文字
 * @return {ListNode}
 */
/**
 * const getAccountList = (params) => getAction('/api/v1.0/account_content/', params, {
 *   loading: true
 * }, {
 * text: '获取列表ing....'
 * }
 * );
 */

//* 重定向
 
export const addItem= (data) => postAction('/timing/food', data);
export const getList= (data) => getAction('/timing/food', data);
export const handleItem= (id) => deleteAction('/timing/food/'+id );




export const getNow= (data) => getAction('/timing/nowtime/food', data);
