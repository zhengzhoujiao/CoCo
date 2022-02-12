const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: ["../imgs/banner/季節限定系列.jpg","../imgs/banner/白色戀人系列.jpg","../imgs/banner/醇黑濃情系列.jpg"],
    news:['新品"雪耳系列"来圈"粉"了！','!!!!!!!!!!!!!']
  },
  //跳转点单
  toshop(e){
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.navigateTo({
          url:'../shopChange/shopChange'
        })
        }
      }
    })
  },
  getUserInfo(e){
    if(e.detail.userInfo){
      var data = {nickName:e.detail.userInfo.nickName,imageUrl:e.detail.userInfo.avatarUrl,openId:app.globalData.openId}
      wx.request({
        url: app.globalData.baseUrl+'user',
        data:JSON.stringify(data),
        method:"POST",
        success:res =>{
          console.log(res)
        }
      })
    }
  },
  //新闻跳转
  jumpNew(e){
    console.log(e.currentTarget.dataset.thenew)
    if(e.currentTarget.dataset.thenew){
      wx.navigateTo({
        url:`../news/news?Title=${e.currentTarget.dataset.thenew.title}&imageUrl=${e.currentTarget.dataset.thenew.imageUrl}&createTime=${e.currentTarget.dataset.thenew.createTime}`
      })
    }
    else{
      wx.navigateTo({
        url:`../news/news?Title=${this.data.news[0].title}&imageUrl=${this.data.news[0].imageUrl}&createTime=${this.data.news[0].createTime}`
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+"banner",
      data: {
        number: that.data.pageIndex,
        size: 2
      },
      method:"GET",
      success(res) {
        console.log(res);
        that.setData({
          images:res.data.result
        })
      }
    })
    wx.request({
      url: app.globalData.baseUrl+'news/',
      method:'GET',
      success:res=>{
        this.setData({
          news:res.data.result
        })
      }
    })
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        console.log(res)
      }
    })
  },
//新闻跳转

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
      selected: 0
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