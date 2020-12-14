// pages/home/home.js
// import request from '../../service/network.js'
import {
  getHomeMultidata,
  getGoodItem
} from '../../service/home.js'
const types = ['pop','sell','new']
const TOP_DISTANCE = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      },
      'new': {
        page: 0,
        list: []
      },
    },
    currentType: 'pop',
    showTop:false,
    isTabFix:false,
    tabScrollTop:0
  },
  // -------------------------事件监听函数-------------------------------
  handleTabClick(event) {
    // console.log(event)
    // 取出index
    const index = event.detail.data.index
    console.log(index)
    // 设置currentType
    const type = types[index]
    this.setData({
      currentType:type
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    // 请求轮播图和推荐数据
    this._getMultiData()
    // 请求tabcontrol的数据
    this._getGoodItem('pop')
    this._getGoodItem('sell')
    this._getGoodItem('new')

  },
  // ---------------------------------网络请求函数--------------------------
  _getMultiData() {
    getHomeMultidata().then(res => {
      // console.log(res)
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })

    })
  },
  _getGoodItem(type) {
    // 1 获取页码
    const page = this.data.goods[type].page + 1
    // 2 发送网络请求
    getGoodItem(type, page).then(res => {
      console.log(res)
      // 3 取出数据
      const data = res.data.data.list
      // 3.1 将数据设置到data中的goods中
      const oldList = this.data.goods[type].list
      oldList.push(...data)
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`

      this.setData({
        [typeKey]: oldList,
        [pageKey]: page + 1

      })
    })
  },
  // 上拉加载更多会触发的函数
  onReachBottom(){
    console.log('上拉加载更多')
    this._getGoodItem(this.data.currentType);

  },
  // 计算按钮距离顶部的距离
  onPageScroll(e){
    // console.log(e.scrollTop)
    // 1. 取出scrollTop
    const scrollTop = e.scrollTop
    // 2.修改showTop的属性
    // 官方提醒 不要在滚动的回调中频繁的调用this.setData
    const flag1 =scrollTop >= TOP_DISTANCE
    if(flag1!=this.data.showTop){
      this.setData({
        showTop:flag1
      })

      // 3.修改isTabFix的属性
      const flag2 = scrollTop >= this.data.tabScrollTop;
      if(flag2!=this.data.isTabFix) {
        this.setData({
          isTabFix:flag2
        })
      }
    }
  },
  // onshow 页面显示出来时的回调函数
  // 页面显示是否意味着所有的图片是否都加载完成---不是
  // onShow(){
  //  setTimeout(()=>{
  //   wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
  //     console.log(rect)
     
  //     }).exec()
  //  },1000)

  // },
  // 获取推荐图片的加载完成tabcontrol1距离顶部的距离
    // handleImageLoad(){
    //   // 获取组件距离顶部的距离
    //   wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
    //     // console.log(rect)
    //     this.data.tabScrollTop = rect.top
    //     }).exec()

    // }

})
