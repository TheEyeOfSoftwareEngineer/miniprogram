// pages/movies/movies.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [], 
    comingSoon: [],
    top250: [],
    searchResult: false,
    searchData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this指代的问题 旧方法:that 后方法:箭头函数
    //const that = this
    // 正在热映
    wx.request({
      // 服务器API的地址
      url: app.gBaseUrl +'in_theaters',
      data:{
        start:0,
        count:3
      },
      // success(res) {
      //   that.setData({
      //     inTheaters: res.data.subjects
      //   })
      // }
      success: res => {
        this.setData({
          comingSoon: res.data.subjects
        })
      }
    })

    wx.request({
      url: app.gBaseUrl + 'coming_soon',
      data:{
        start:0,
        count:3
      },        
      success: res => {
        this.setData({
          inTheaters: res.data.subjects
        })
      }
    })

    wx.request({
      url: app.gBaseUrl + 'top250',
      data:{
        start:0,
        count:3
      },
      success: res => {
        this.setData({
          top250: res.data.subjects
        })
      }
    })
  },

  onGotoMore(event) {
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type='+type,
    })
  },

  onConfirm(event) {
    this.setData({
      searchResult: true
    })
    const value = event.detail.value
    wx.request({
      url: app.gBaseUrl + 'search',
      data:{
        q:value
      },
      success: (res) => {
        this.setData({
          searchData: res.data.subjects
        })
      }
    })
  },

  onCancel(event) {
    this.setData({
      searchResult: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})