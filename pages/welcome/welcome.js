// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //这是在js对象内部,所以函数定义的方式需要注意
  onTap: function(param) {
    //页面跳转
    //navigateTo相当于给一个页面添加一个子页面，可以从子页面返回
    //页面栈最多保留10个
    //navigateTo父界面并没有被销毁 redirectTo父界面销毁
    // wx.navigateTo({
    //   url: '/pages/posts/posts',
    // })

    wx.redirectTo({
      url: '/pages/posts/posts',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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