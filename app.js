// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    const myData = [1,2,3]
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    myData.map(n => n ** 2)
 
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})


