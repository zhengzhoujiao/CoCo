// pages/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //订单列表
    orderList:[],
    //取餐时间
    theTime:'立刻取单',
    //总价
    pricenum:0,
    //商品数目
    capnum:0,
    //店铺id
    shopid:''
  },
  topay(){
    let theOrder = []
    this.data.orderList.forEach(item=>{
      theOrder.push({Mid:item.mid,Number:item.number,SelectedAttr:item.attr,PayMoney:item.newPrice})
    })
    let now = new Date()
    let month = now.getMonth()+1
    if(month < 10){
      month = '0'+month
    }
    let theDate = `${now.getFullYear()}-${month}-${now.getDate()}`
    console.log(this.data.theTime)
    if(this.data.theTime!='立刻取单'){
      var time = `${theDate} ${this.data.theTime}:00`
    }
    wx.request({
      url: app.globalData.baseUrl+'corder/',
      method:'POST',
      data:JSON.stringify({
        order:{
          Bid:this.data.shopid,
          AppointTime:time,
          Money:this.data.pricenum,
          Count:this.data.capnum
        },
        orderList:theOrder,
        openId:app.globalData.openId
      })
    })
    wx.showLoading({
      title: '支付中',
    })
    setTimeout(function(){
      wx.hideLoading({
        success: (res) => {
          wx.showToast({
            title: '支付成功',
            duration:1000,
            success:res=>{
              setTimeout(function(){
                wx.reLaunch({
                  url: '../orderFrist/orderFrist'
                });
              },1000)
            }
          })
        },
      })
    },2000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderList:JSON.parse(options.carlist),
      theTime:options.theTime,
      pricenum:options.pricenum,
      capnum:options.capnum,
      shopname:options.shopname,
      shopid:options.shopid
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