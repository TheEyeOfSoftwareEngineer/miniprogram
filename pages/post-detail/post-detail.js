// pages/post-detail/post-detail.js

import {postList} from "../../data/data.js"
const app = getApp()

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
    _posts_collected: {},
    isPlaying: false,
    _mgr: null
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
    let collected = posts_collected[this.data._pid]
    if(collected===undefined) {
      collected = false
    }

    const postData = postList.filter((post, index, arr) => {
      return post.postId == pid
    })[0]

    this.setData({
      postData,
      collected,
      isPlaying: this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicStop)
  },

  currentMusicIsPlaying () {
    if(app.gIsPlayingMusic && app.gIsPlaingPostId===this.data._pid) {      
      return true      
    }
    return false
  },

  async onShare(event) {
    const response = await wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微信', '分享到朋友圈'],
      // success(res) {

      // }
    })
    console.log(response)
  },

  onMusicStart(event) {    
    const mgr = this.data._mgr

    const music = postList.filter((post, index, arr)=> {
      return post.postId == this.data._pid
    })[0]['music']

    //[接口更新提示] 若需要小程序在退到后台后继续播放音频，你需要在 app.json 中配置 requiredBackgroundModes 属性
    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg

    app.gIsPlayingMusic = true
    app.gIsPlaingPostId = this.data._pid
    this.setData({
      isPlaying: true
    })

  },

  onMusicStop(event) {
    const mgr = this.data._mgr
    mgr.stop()
    // 音乐停止 - strat
    // 音乐播放 - stop
    app.gIsPlayingMusic = false
    app.gIsPlaingPostId = -1
    this.setData({
      isPlaying: false
    })
  },

  onCollect(event) {
    // 未收藏 -> 收藏
    // 哪篇文章被收藏
    // 设计一个数据结构 多篇文章是否被收藏
    // 我们可以先设置好js对象再传入

    const postsCollected = this.data._posts_collected
    
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

    // 轻提示
    wx.showToast({
      title: this.data.collected?'收藏成功':'取消收藏',
      duration: 3000,
      icon: 'success'
    })

    // 模态对话框
    //  title
    //  content等等
    //  success 无论点击哪个按钮这个回调函数都会触发

    // const response = await wx.showModal({
    //   title: this.data.collected? '是否取消收藏':'是否收藏文章',
    //   // success(res) {
    //   //   //如果是确定动作那么就执行取消收藏或者确认收藏的操作
    //   // }
    // })

    // if(response.confirm) {
    //   const postsCollected = this.data._posts_collected
    
    //   postsCollected[this.data._pid] = !this.data.collected
  
    //   this.setData({
    //     collected: !this.data.collected
    //   })
  
    //   wx.setStorageSync('posts_collected', postsCollected)
    // }

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
  // 微信分享是使用 不需要做什么 有这个函数就可以了
  onShareAppMessage: function () {

  }
})