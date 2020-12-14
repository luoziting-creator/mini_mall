import request from './network.js'
export function getHomeMultidata(){
  return request({
    url: '/home/multidata',
  })
}
export function getGoodItem(type,page){
  return request({
    url:'/home/data',
    data:{
      type,
      page
    }
  })
}