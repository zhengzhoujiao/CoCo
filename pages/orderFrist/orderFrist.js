const app = getApp()
// pages/orderFrist/orderFrist.js
import Dialog from '../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderFlag:true,
    //订单列表
    orderList:[],
    show:false,
    //订单详情
    orderdetail:[],
    //当前点击订单
    TheOrder:[]
  },
  //跳页
  jump:function(e){
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      wx.request({
        url: app.globalData.baseUrl+'corder/',
        data:{
          openId:app.globalData.openId
        },
        method:'GET',
        success:res=>{
          this.setData({
            orderList:res.data.result
          })
          if(this.data.orderList.length>0){
            this.setData({
              orderFlag:false
            })
          }
          else{
            this.setData({
              orderFlag:true
            })
          }
        }
      })
    }
  },
  //订单详情弹窗
  orderDetail:function(e){
    wx.request({
      url: `${app.globalData.baseUrl}orderdetail/${e.currentTarget.dataset.theorder.id}`,
      method:'GET',
      success:res=>{
        this.setData({
          show: true,
          orderdetail:res.data.result,
          TheOrder:e.currentTarget.dataset.theorder,
        })
        console.log(this.data.orderdetail)
      }
    })
  },
  onClose() {
    this.setData({ show: false });
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
    if(app.globalData.userInfo){
      wx.request({
        url: app.globalData.baseUrl+'corder/',
        data:{
          openId:app.globalData.openId
        },
        method:'GET',
        success:res=>{
          this.setData({
            orderList:res.data.result
          })
          if(this.data.orderList.length>0){
            this.setData({
              orderFlag:false
            })
          }
          else{
            this.setData({
              orderFlag:true
            })
          }
        }
      })
    }
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