
//获取应用实例
const app = getApp()
var pay_stu;
var time;
var id;
Page({
  data: {
    id,
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shopping_info: {},
    pay_stu,
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    var name = app.globalData.userInfo.nickName
    wx.request({
      url: 'https://www.promisem.cn/seckill/seckill/' + name + '/Name',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log("res.data.seckill"),
          this.setData({
            shopping_info: res.data.seckill
          })
      }
    })
    this.setData({
      id: wx.getStorageSync("sigId")
    })
  },
  onLoad: function () {
    this.setData({
      id: wx.getStorageSync("sigId")
    })
    if (app.globalData.userInfo) {
      var name = app.globalData.userInfo.nickName
      wx.request({
        url: 'https://www.promisem.cn/seckill/seckill/' + name + '/Name',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            shopping_info: res.data.seckill
          })
        }
      }),
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      var name = app.globalData.userInfo.nickName
      wx.request({
        url: 'https://www.promisem.cn/seckill/seckill/' + name + '/Name',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            shopping_info: res.data.seckill
          })
  
        }
      })
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      console.log("用户拒绝开放权限")
    }
  },
})
