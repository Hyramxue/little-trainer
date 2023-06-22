import myAxios from './request'
 


//post
export function postAction(url, data, customOptions, loadingOptions) {

 
  return myAxios({
    url: url,
    method: 'post',  

    data,

  }, customOptions, loadingOptions,)
}



//put
export function putAction(url, data) {
  return myAxios({
    url: url,
    method: 'put',
    data,
  })
}

//get
export function getAction(url, params, customOptions, loadingOptions) {


  return myAxios({
    url: url,
    method: 'get',
    params,

  }, customOptions, loadingOptions)
}

//deleteAction
export function deleteAction(url, params) {
  return myAxios({
    url: url,
    method: 'delete',
    params,
  })
}


//post method= {post | put}
export function httpAction(url, data, method) {

  return myAxios({
    url: url,
    method: method,
    data,

  })
}