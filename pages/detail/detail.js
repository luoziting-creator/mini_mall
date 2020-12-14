// pages/detail/detail.js
import {
  getDetail,
  getRecommend,
  GoodsBaseInfo,
  ShopInfo,
  ParamsInfo,
  
} from '../../service/detail.js'
const app =getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImages: [],
    baseInfo:{},
    shopInfo:{},
    detailInfo:{},
    paramsInfo:{},
    recommendInfo:[],
    showTop:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    //1. 传入对应的iid
    this.setData({
      iid:options.iid
    })
    // 2.请求商品详情数据
    this._getDetailData()
    // 3 请求推荐的数据
    this._getRecommends()

  },
  
  _getDetailData(){
    getDetail(this.data.iid).then(res=>{
      // console.log(res)
      const data = res.data.result
      // console.log(data)
      // 1.取出顶部的图片
      const topImages= []
      for (var i=0;i<data.itemInfo.topImages.length;i++)
      { 
        topImages.push({"image":data.itemInfo.topImages[i]});
      }
       // 2.创建baseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 3创建 shopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo)
      // console.log(shopInfo)

      // 4.获取detailInfo 信息
      const detailInfo = data.detailInfo
      // 获取参数信息
      const paramsInfo = new ParamsInfo(data.itemParams.info,data.itemParams.rule)
      // 获取评论信息
      const commentInfo = data.rate.list[0]
      

      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramsInfo,
        commentInfo

      })
    
    })


  },
  _getRecommends(){
    getRecommend().then(res=>{
      console.log(res)
      const recommendInfo = res.data.data.list
      this.setData({
        recommendInfo
       
      })
      // console.log(recommendInfo)
    })
  },
  onPageScroll(e){
    const scrollTop = e.scrollTop
    // console.log(e)
    const flag = scrollTop >=  1000
    if(flag!=this.data.showTop){
     this.setData({
      showTop:flag
     })
    }

  },
  // 点击加入购物车
  addCart(){
    // console.log('11111')
    // 1.获取要添加到购物车的对象
    const obj={}
    obj.iid=this.data.iid
    obj.imageURL=this.data.topImages[0]
    obj.title=this.data.baseInfo.title
    obj.desc=this.data.detailInfo.desc
    obj.price==this.data.baseInfo.realPrice
    // 2.将商品添加到购物车
    app.addToCart(obj)
    // 3.提示信息
    wx.showToast({
      title:'加入购物车成功'
    })


  }
})
