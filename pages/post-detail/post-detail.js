// pages/post-detail/post-detail.js

import {postList} from "../../data/data.js"

// 获取全局变量方式1
// 我们可以通过getApp()方式获取定义在App.js中的全局变量
// const app = getApp()
// console.log(app.global)
// 但是App.js中的数据是不可以永久保存的 应用重启就恢复了

// 获取全局变量方式2
// 通过小程序的缓存设置变量 类似于localstorage
// 相当于前端的数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{},
    collected: false,
    _pid: null,
    _posts_collected: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //onLoad函数可以获取传入的数据
    //options内存储着传到该界面的数据
    
    const pid = options.pid
    this.data._pid = pid

    //读取cache中的数据
    const posts_collected = wx.getStorageSync('posts_collected')
    const collected = posts_collected[this.data._pid]
    const postData = postList.filter((post, index, arr) => {
      return post.postId == pid
    })[0]

    this.setData({
      postData,
      collected
    })

  },

  onCollect(event) {
    // 未收藏 -> 收藏
    // 哪篇文章被收藏
    // 设计一个数据结构 多篇文章是否被收藏
    // 我们可以先设置好js对象再传入
    let postsCollected = this.data._posts_collected
    
    postsCollected[this.data._pid] = !this.data.collected

    this.setData({
      collected: !this.data.collected
    })

    wx.setStorageSync('posts_collected', postsCollected)

    // 动态访问属性
    // const obj = {
    //   key: 1
    // }
    // 在已知属性名是我们可以使用.key获取属性的值
    // obj.key获取的就是obj中键为key的值
    // obj.key = 2 
    // 如下动态获取属性 我们可以传入一个对应参数为key的参数名
    // 比如我们可以有 attr 此时我们可以使用obj[attr]访问obj中attr代表的键名称对应的值
    // obj['key'] = 2

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