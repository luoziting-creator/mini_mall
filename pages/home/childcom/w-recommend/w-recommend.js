// pages/home/childcom/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommend:{
      type:Array,
      value:[]
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad:false,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageLoad(){
      if(!this.data.isLoad){
        this.data.isLoad=true
        this.triggerEvent('imageLoad')
        console.log('111')
      }
    }

  }
})
