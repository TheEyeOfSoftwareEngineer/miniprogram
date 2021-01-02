// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // text: {
    //   type: String,
    //   value: ""
    // }
    res:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   * 自定义事件
   */
  methods: {
    onTap(event){
      const pid = this.properties.res.postId
      //抛出自定义的事件
      this.triggerEvent('posttap',{
        pid
      })
    }
  }
})
