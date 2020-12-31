// pages/posts/posts.js

// 导入方式1
// require里不能用结对路径
// var postData = require("../../data/data.js")

// 导入方式2 ES6语法 导入参数名需要和导出的保持一致
import {postList} from "../../data/data.js"

Page({

  /**
   * 页面的初始数据
   */
  // 数据驱动
  data: {
    // 值的初始化
    a: "2020LPL夏季赛季后赛观赛指南"
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // ES6 定义函数
  // onLoad(options) {}
  async onLoad(options) {
    // setData接受的js对象并将数据插入this.data中
    // 创建+更新
    
    //setData参数需要是对象,如果不是对象我们将包装成对象
    // key和value相同，可以直接用key代替

    // 向cache中添加key-value对

    // 新增
    // wx.setStorageSync('key', true)
    // 修改
    // wx.setStorageSync('key', false)
    // wx.setStorageSync('key1', 1)
    // 删除
    // wx.removeStorageSync('key')
    // 清空
    // wx.clearStorageSync()
    // 读取缓存
    // const key = wx.getStorageSync('key')

    // setStorageSync 同步
    // 异步
    // wx.setStorageSync('key', 1)
    // wx.getStorage() 传入的是js对象 需要获取的值对应的是key的值 如果需要获取'key'的值就将'key'设置给js对象key
    // 并且getStorage将返回一个promise

    // 老版本的方案
    // 如果我们传入success处理函数那么const key就是undifined;如果没有传入，const key就是一个promise
    // const key = wx.getStorage({
    //   key: 'key',
    //   success(value) {
    //     console.log(value.data)
    //   }
    // })

    // 新版的方案1
    // const key = wx.getStorage({
    //   key: 'key',
    // })
    // key.then((v)=> {
    //   console.log(v)
    // })

    // 新版的方案2 ES7
    // 函数体的内部出现了await 那么我们需要在函数体前加入async
    // 这里onLoad函数里面有await 那么我们需要在onLoad前加入async
    // const key = await wx.getStorage({
    //   key: 'key',
    // })

    //console.log(key)

    this.setData({
      postList
    });

  },

  onGoToDetail(event) {
    //event 事件对象
    //页面与页面之间的数据通信
    //查询参数通过?连接 如?pid= 
    //多个查询参数通过&连接 如?pid=3&value=4
    const pid = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid=' + pid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 页面出现，但是不代表数据等准备完全
   * 先于onReady执行
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   * 切后台两个钩子被触发: onHide onShow(页面没有二次渲染)
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