// pages/category/childCpns/w-content/w-content.js
const types = ['pop', 'new', 'sell']

Component({
  properties: {
    subcategories: {
      type: Array
    },
    categoryDetail: {
      type: Array
    }
  },
  data: {
    currentIndex: 0,
   
    currentType:'pop'

  },
 
  observers: {
    // categoryDetail: function (newValue) {
    //   console.log(newValue)
    // }
  },
  lifetimes: {
    ready() {
      // console.log(this.properties.categoryDetail)
    }
  },
  methods: {
    tabClick(e) {
      // console.log(this.properties.categoryDetail)
      console.log(e)
      // // 1.获取当前的index
      const currentIndex = e.detail.data.index;

      // // 2.获取当前的type
      let currentType = types[currentIndex]

      

      // // 3.改变data中的数据
      this.setData({
        currentIndex,
        currentType
      })
    }
  }
})
