// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'
import {
  getGoodItem
} from '../../service/home.js'
Page({
  data: {
    categories: [],
    categoryData: {
    },
    currentIndex: 0,
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
  },
  onLoad: function (options) {
    this._getData()
    this._getGoodItem('pop')
    this._getGoodItem('sell')
    this._getGoodItem('new')
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
  _getData() {
    // 1.请求分类数据
    this._getCategory()
  },
  _getCategory() {
    getCategory().then(res => {
      // 1.获取categories
      const categories = res.data.data.category.list;

      // 2.初始化每个类别的子数据
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
          // categoryDetail: {
          //   'pop': [],
          //   'new': [],
          //   'sell': []
          // }
        }
      }

      // 3.修改data中的数据
      this.setData({
        categories: res.data.data.category.list,
        categoryData: categoryData
      })

      // 4.请求第一个类别的数据
      this._getSubcategory(0)

      // 5.请求第一个类别的详情数据
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex) {
    // 1.获取对应的maitkey
    const maitkey = this.data.categories[currentIndex].maitKey;

    // 2.请求的数据
    getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    // 1.获取对应的miniWallKey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;

    // 2.请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  },
  _getRealCategoryDetail(index, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      // 1.获取categoryData
      const categoryData = this.data.categoryData;

      // 2.修改数据
      categoryData[index].categoryDetail = res;

      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },
  menuClick(e) {
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })

    // 2.请求对应currentIndex的数据
    this._getSubcategory(currentIndex);

    // 3.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  }
})