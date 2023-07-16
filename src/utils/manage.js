import request from './request'
 


//post
export function postAction(url, data, customOptions, loadingOptions) {

 
  return request({
    url: url,
    method: 'post',  

    data,

  }, customOptions, loadingOptions,)
}



//put
export function putAction(url, data) {
  return request({
    url: url,
    method: 'put',
    data,
  })
}

//get
export function getAction(url, params, customOptions, loadingOptions) {


  return request({
    url: url,
    method: 'get',
    params,

  }, customOptions, loadingOptions)
}

//deleteAction
export function deleteAction(url, params) {
  return request({
    url: url,
    method: 'delete',
    params,
  })
}


//post method= {post | put}
export function httpAction(url, data, method) {

  return request({
    url: url,
    method: method,
    data,

  })
}