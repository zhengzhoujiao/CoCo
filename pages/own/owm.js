// pages/own/owm.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fun:[{funName:"我的优惠",iconfontSrc:"/pages/imgs/_优惠券.svg"},{funName:"1843****929",iconfontSrc:"/pages/imgs/手机.svg"},{funName:"平台须知",iconfontSrc:"/pages/imgs/警告.svg"},{funName:"CoCo钱包",iconfontSrc:"/pages/imgs/钱.svg"},{funName:"我的收货地址",iconfontSrc:"/pages/imgs/地址.svg"}]
  },
  updata:function(res){
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo:res.userInfo
              })
            }
          })
        }
      }
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  getUserInfo(res){
    console.log(res)
    if(res.detail.userInfo){
      this.setData({
        userInfo:res.detail.userInfo
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo:res.userInfo
              })
            }
          })
        }
      }
    })
    // wx.login({
    //   success: function (loginCode) {
    //     console.log(loginCode.code, "code")
    //     // 获取openid
    //     wx.request({
    //       url: "http://localhost:52714/home/myown",
    //       data: {
    //         code: loginCode.code
    //       },
    //       success: function (res) {
    //         console.log(res);
    //         that.setData({
    //           gznum: res.data.gznum,
    //           fsnum: res.data.fsnum,
    //           fblist: res.data.fblist,
    //           qglist: res.data.qglist
    //         })
    //       }
    //     })
    //   }
    // })
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
    this.getTabBar().setData({
      selected: 2
    });
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