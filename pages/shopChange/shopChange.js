// pages/shopChange/shopChange.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    shopList:[],
    //copy一份店铺列表用于点店铺详情后的绑定操作
    shopListCopy:[],
    fristShop:[],
    height:0,
    //取单时刻
    time:"立刻取单",
    //当前时间
    now:'',
    //收藏列表
    likeList:[],
    //收藏列表是否有值
    pdflage:true,
    //回顶部
    topNum:0,
    lng:0,
    lat:0,
    shoplng:0,
    shoplat:0,
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var d = new Date()
    this.setData({
      now:d.getHours()+':'+d.getMinutes()
    })
    let length = this.data.shopList.length;
    let theheight = length*210+480*2+20
    wx.getLocation({
      type: 'wgs84',
      isHighAccuracy:true,
      success: res=> {
        this.setData({
          lat:res.latitude,
          lng:res.longitude
        })
      }
     })
    wx.request({
      url: app.globalData.baseUrl+'businesses/?lng=112.374388&lat=34.662788&radius=3000',
      method:'GET',
      data:{
        openId:app.globalData.openId
      },
      success:res=>{
        this.setData({
          shopList:res.data.result
        })
        let starList = []
        this.data.shopList.forEach(item=>{
          if(item.isStar == true){
            starList.push(item)
          }
        })
        this.setData({
          likeList:starList
        })
        if(starList.length>0){
          this.setData({
            pdflage:false
          })
        }
        this.setData({
          fristShop:[that.data.shopList[0]],
          shopListCopy:JSON.parse(JSON.stringify(that.data.shopList)),
          height:`${theheight}rpx`,
          shoplat:that.data.shopList[0].lat,
          shoplng:that.data.shopList[0].lng
        })
        that.data.shopList.shift()
        this.setData({
          shopList:that.data.shopList
        })
        let a = []
        this.data.shopListCopy.forEach(item=>{
          let themk = {
            id: item.id,
            latitude: item.lat,
            longitude: item.lng,
            iconPath: '/pages/imgs/坐标.svg',
            width:20,
            height:20,
            callout: {
              content: item.name,
              fontSize: 14,
              borderRadius: 10,
              bgColor: '#fff',
              padding: 3,
              display: 'ALWAYS',
              textAlign: 'center'
            }
        }
        a.push(themk)
      })
      this.setData({
        markers:a
      })
      console.log(this.data.markers)
    }})
    
  },
  //禁用左右滑动
  stopTouchMove: function() {
    return false;
  },
  //点击店铺切换
  shopChance:function(item){

  },
  //选择取单时间
  chance:function(e){
    this.setData({
      Thetime:e.detail.value
    })
  },
  //选饮品 店铺介绍fristshop属性下的
  toDrink:function(e){
    let shopid = this.data.fristShop[0].id
    let shopName = this.data.fristShop[0].name
    let theTime = this.data.time
    let address = this.data.fristShop[0].address
    wx.redirectTo({
      url: `../order/order?shopid=${shopid}&theTime=${theTime}&address=${address}&shopName=${shopName}`
    })
  },
  //时间pk
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  //收藏店铺
  likeShop:function(e){
    let method = ''
    let title = ''
    if(e.currentTarget.dataset.theshop.isStar != true)
    {
      method = 'POST'
      title='收藏成功'
    }
    else{
      method = 'DELETE'
      title='取消收藏成功'
    }
    var that = this
    if(e.currentTarget.dataset.theshop.name == this.data.fristShop[0].name){
      this.data.fristShop[0].isStar = !this.data.fristShop[0].isStar
    }
    this.setData({
      fristShop:this.data.fristShop
    })
    var index = this.data.shopListCopy.map(item => item.name).indexOf(e.currentTarget.dataset.theshop.name)
    this.data.shopListCopy[index].isStar = !this.data.shopListCopy[index].isStar
    this.setData({
      shopListCopy:this.data.shopListCopy
    })
    var index = this.data.shopList.map(item => item.name).indexOf(e.currentTarget.dataset.theshop.name)
    if(index>=0){
      this.data.shopList[index].isStar = !this.data.shopList[index].isStar
      this.setData({
        shopList:this.data.shopList
      })      
    }
    wx.request({
      url: app.globalData.baseUrl+'starshop/',
      method:method,
      data:{
        bid:e.currentTarget.dataset.theshop.id,
        openId:app.globalData.openId
      },
      success:res=>{
        console.log(res)
        if(res.data.message=="success"){
          wx.showToast({
            title: title,
            icon: 'success',
            duration: 2000
          })
        }
         wx.request({
           url: app.globalData.baseUrl+'businesses/?lng=112.374388&lat=34.662788&radius=3000',
           method:'GET',
           data:{
            openId:app.globalData.openId
          },
           success:res=>{
             console.log(res)
            let list = res.data.result
            let starList = []
            list.forEach(item=>{
              if(item.isStar == true){
                starList.push(item)
              }
            })
            this.setData({
              likeList:starList
            })
            if(starList.length>0){
              this.setData({
                pdflage:false
              })
            }
            else{
              this.setData({
                pdflage:true
              })
            }
            console.log(this.data.pdflage)
            console.log(this.data.likeList)
           }
         }) 
      }
    })
  },
  //点击详情
  changeThis:function(e){
    let newarr=[]
    newarr.push(e.currentTarget.dataset.changeshop)
    this.setData({
      fristShop:newarr
    })
    var index = this.data.shopListCopy.map(item => item.name).indexOf(newarr[0].name)
    console.log(index)
    this.setData({
      shopList:JSON.parse(JSON.stringify(this.data.shopListCopy))
    })
    console.log(this.data.shopListCopy)
    this.data.shopList.splice(index,1)
    this.setData({
      shopList:this.data.shopList
    })
    this.setData({
      topNum:0,
      shoplng:e.currentTarget.dataset.changeshop.lng,
      shoplat:e.currentTarget.dataset.changeshop.lat
    })
  },
 //点击切换
 clickTab: function (e) {
  var that = this;
  if (this.data.currentTab === e.target.dataset.current) {
   return false;
  } else {
   that.setData({
    currentTab: e.target.dataset.current
   })
  }
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