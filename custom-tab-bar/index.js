Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#FF8000",
    list: [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "/pages/imgs/首页.png",
        "selectedIconPath": "/pages/imgs/首页.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/orderFrist/orderFrist",
        "iconPath": "/pages/imgs/奶茶.png",
        "selectedIconPath": "/pages/imgs/奶茶.png",
        "text": "订单"
      },
      {
        "pagePath": "/pages/own/owm",
        "iconPath": "/pages/imgs/我的.png",
        "selectedIconPath": "/pages/imgs/我的.png",
        "text": "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index
      })
      wx.switchTab({ url })
      // wx.setStorageSync({'currentIndex':data.index})
    }
  },
})