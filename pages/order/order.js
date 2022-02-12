
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品详情弹窗
    show:false,
    //购物车弹窗
    showTwo:false,
    //搜索页面弹窗
    showThree:false,
    //取餐时间
    time:'now',
    //店铺名
    shopname:"",
    toView:'a1',
    seltectedStr:"",
    //当前点击奶茶
    theCap:[],
    //当前点击奶茶全部配料信息
    theCapDetail:[],
    //当前点击属性
    theprop:'',
    //总价
    PriceSum:0,
    //当前点击奶茶总价
    capPrice:0,
    //CarList
    CarList:[],
    //商品总数
    shopnum:0,
    //侧边栏
    KindList:[],
    //商品列表
    shopList:[],
    //购物车列表
    address:'',
    shopName:''
  },
    //订单详情弹窗
    add:function(e){
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: `${app.globalData.baseUrl}milkteaattr/${e.currentTarget.dataset.thecap.mid}`,
        method:'GET',
        success:res=>{
          wx.hideLoading({
            success: (res) => {
              this.setData({
                show: true
              })
            },
          })
          console.log(res)
          this.setData({
            theCapDetail:res.data.result
          })
          this.getChecked()
        }
      })
      this.setData({
        theCap:[e.currentTarget.dataset.thecap]
      })
     console.log(this.data.theCap)
    },
    //购物车详情
    carlistDetail(){
      this.setData({ showTwo: true });
    },
    //搜索页详情
    search(){
      this.setData({ showThree: true });
    },
    onClose() {
      this.setData({ show: false });
    },
    onCloseTwo() {
      this.setData({ showTwo: false });
    },
    onCloseThree() {
      this.setData({ showThree: false });
    },
    //添加奶茶属性
    changeadd:function(e){
      let type = e.currentTarget.dataset.theprop.type
      let name = e.currentTarget.dataset.theprop.property
      let arr = this.data.theCapDetail
      arr.forEach(item => {
        if (item.name == type){
          item.detail.forEach(val => {
            if (val.property == name){
              val.checked = true
            } else {
              val.checked = false
            }
          })
        }
      })
      this.setData({
        theprop:e.currentTarget.dataset.theprop.property,
        theCapDetail :arr
      })
      this.getChecked()
    },
  jump:function(e){
    this.setData({
      toView:e.currentTarget.dataset.hash
    })
  },
  getChecked(){
    let capprice=this.data.theCap[0].oriPrice
    let str = ""
    this.data.theCapDetail.forEach(item => {
      item.detail.forEach(item => {
        if (item.checked){
          capprice+=item.jlPrice
          str+=item.property+'/'
        }
      })
    })
    console.log(str)
    this.setData({
      seltectedStr:str.substring(0,str.length-1),
      capPrice:capprice
    })
  },
  //加入购物车
  addCar(){
    let newCap = this.data.theCap[0]
    newCap.newPrice=this.data.capPrice
    newCap.attr = this.data.seltectedStr
    newCap.number=1
    if(this.data.CarList.length==0){
      this.data.CarList.push(newCap)
      this.setData({
        PriceSum:this.data.PriceSum+newCap.newPrice,
        shopnum:this.data.shopnum+1
      })
    }
    else{
      let flag = this.data.CarList.filter((item)=>{
        let a = JSON.parse(JSON.stringify(item))
        a.number=1
        if(JSON.stringify(a)==JSON.stringify(newCap)){
          item.number++
          this.setData({
            PriceSum:this.data.PriceSum+item.newPrice,
            shopnum:this.data.shopnum+1
          })
          return true
        }
      })
      if(flag.length<=0){
        this.data.CarList.push(newCap)
        this.setData({
          PriceSum:this.data.PriceSum+newCap.newPrice,
          shopnum:this.data.shopnum+1
        })
      }
    }
    this.setData({
      CarList:this.data.CarList,
      show: false
    })
  },
  //图标加
  carAdd(e){
    console.log(e)
    let theIndex = e.currentTarget.dataset.idx
    this.data.CarList[theIndex].number++
    let newPrice = this.data.PriceSum + e.currentTarget.dataset.item.newPrice
    let newnum = this.data.shopnum+1
    this.setData({
      CarList:this.data.CarList,
      PriceSum:newPrice,
      shopnum:newnum
    })
  },
  //图标减
  carCut(e){
    let theIndex = e.currentTarget.dataset.idx
    if(this.data.CarList[theIndex].number>1){
      let newPrice = this.data.PriceSum - e.currentTarget.dataset.item.newPrice
      this.data.CarList[theIndex].number--
      let newnum = this.data.shopnum-1
      this.setData({
        shopnum:newnum,
        PriceSum:newPrice
      })
    }
    else{
      this.data.CarList.splice(theIndex,1)
      let newnum = this.data.shopnum-1
      let newPrice = this.data.PriceSum - e.currentTarget.dataset.item.newPrice
      this.setData({
        CarList:this.data.CarList,
        shopnum:newnum,
        PriceSum:newPrice
      })
    }
    this.setData({
      CarList:this.data.CarList
    })
  },
  //下单
  topay(){
    if(this.data.CarList.length>0){
      //订单列表
      let thelist = JSON.stringify(this.data.CarList)
      //取餐时间
      let theTime = this.data.time
      //总价
      let pricenum = this.data.PriceSum
      //商品数目
      let capnum = this.data.shopnum
      //店铺名
      let shopname = this.data.shopname 
      //店铺id
      let shopid = this.data.shopid
      wx.redirectTo({
        url: `../pay/pay?carlist=${thelist}&theTime=${theTime}&pricenum=${pricenum}&capnum=${capnum}&shopname=${shopname}&shopid=${shopid}`,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopid:options.shopid,
      shopName:options.shopName,
      time:options.theTime,
      address:options.address.slice(6)
    })
    wx.request({
      url: app.globalData.baseUrl+'salingmilktea/'+options.shopid,
      method:'GET',
      success:res=>{
        let kindList = []
        let cupList = []
        res.data.result.forEach(item=>{
          item.category.hash='a'+item.category.displayOrder
          kindList.push(item.category)
          item.goodList[0].hash = item.category.hash
          cupList.push(...item.goodList)
        })
        this.setData({
          KindList:kindList,
          shopList:cupList
        })
        console.log(this.data.KindList)
        console.log(this.data.shopList)
      }
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
    // this.getTabBar().setData({
    //   selected: 1
    // });
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