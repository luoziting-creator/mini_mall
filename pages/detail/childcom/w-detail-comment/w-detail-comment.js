// pages/detail/childcom/w-detail-comment/w-detail-comment.js
import {formatDate} from '../../../../utils/utils.js'
Component({ 
  /**
   * 组件的属性列表
   */
  properties: {
    commentInfo:{
      type:Object
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDate(value){
      // 将时间戳转成Date对象
      const date = new Date(value*1000)
      // 2.将date进行格式化
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
   

  }
})
