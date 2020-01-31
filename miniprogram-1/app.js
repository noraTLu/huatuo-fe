//app.js
App({
  loginWithUnionid: function (unionid, isDummy) {
    //TODO: get staff id
    if (isDummy){
      this.globalData.staffid='43859166';
      this.globalData.loginSuccess=true;
    }else{
      console.info('call backend to check whether has bind');
    }
  },
  bindWithUnionid: function (unionid, isDummy) {
    if (isDummy) {
      this.globalData.staffid = '43859166';
      this.globalData.loginSuccess = true;
      wx.navigateTo({
        url: "../report/report"
      })
    } else {
      console.info('call backend to bind');
    }
  },
  getWechatids: function (code, isDummy) {
    if(isDummy){
      this.globalData.wechatIds = { 'unionId': '123', 'openId': '456' };
    }else{
      console.info('call backend get wechat id');
    }
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录, everytime open will call
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        //TODO: get unionId and set in global ids
        this.getWechatids(res.code);
        console.log("get unionid done") 
        this.loginWithUnionid(this.globalData.wechatIds, false);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    staffid: null,
    wechatIds: null,
    loginSuccess: false
  }
})