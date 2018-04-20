var app = getApp();
var calendarSignData;
var date;
var calendarSignDay;
var sigId;
Page({
  data: {
    pictures: ['https://www.promisem.cn/image/sign/QR_code.jpg',
    ],
    card_pictures: ['https://www.promisem.cn/image/sign/bomb_box.png'],
    sigId,
    calendarSignDay: 0,
    calendarSignData,
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  onShareAppMessage: function () {
    return {
      title: '路劲又一城开业打卡',
      desc: '路劲又一城苏州吴江开业打卡!',
      path: '/pages/sign/sign'
    }
  },
  //事件处理函数
  calendarSign: function (options) {
    var nk = app.globalData.userInfo.nickName;
    console.log("设置过后的sigId" + this.data.sigId)
    calendarSignData[date] = date;
    calendarSignDay = parseInt(wx.getStorageSync("calendarSignDay")) + 1;
    wx.setStorageSync("calendarSignData", calendarSignData);
    wx.setStorageSync("calendarSignDay", calendarSignDay);
    console.log('签到之后' + calendarSignData);
    console.log('签到之后' + calendarSignDay)

    this.setData({
      calendarSignData: calendarSignData,
      calendarSignDay: calendarSignDay
    })

    if (calendarSignDay == 7) {
      this.setData({
        flag: true
      })
    } else {
      wx.showToast({
        title: '签到成功',
        icon: 'success',
        duration: 1000
      })
    }
    // 数据库执行更新方法 签到天数加1

    wx.request({
      url: 'https://www.promisem.cn/sig/admin/getsigbyid?sigName' + '=' + nk,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log("res.data" + res.data.sig.sigId)
        this.setData({
          sigId: res.data.sig.sigId,
        })
        console.log(this.data.sigId)
        console.log('calendarSignDay ***= ' + wx.getStorageSync("calendarSignDay"))
        var id = this.data.sigId
        // var id = parseInt(wx.getStorageSync("sigId"))
        console.log("id==" + id)
        wx.request({
          url: 'https://www.promisem.cn/day/admin/modifysig?sigId=' + id + '&sigDay=' + parseInt(wx.getStorageSync("calendarSignDay")), //仅为示例，并非真实的接口地址
          data: {
            x: '',
            y: ''
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            console.log(res.data)
          }
        })

      }
    })
  },
  onLoad: function () {
    //日历部分
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
    console.log("month" + month)
    date = mydate.getDate();
    console.log("date" + date)
    var day = mydate.getDay();
    console.log(day)
    var nbsp;
    if ((date - day) <= 0) {
      nbsp = day - date + 1;
    } else {
      nbsp = 7 - ((date - day) % 7) + 1;
    }
    console.log("nbsp" + nbsp);
    var monthDaySize;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };
    // 判断是否签到过
    if (wx.getStorageSync("calendarSignData") == null || wx.getStorageSync("calendarSignData") == '') {
      wx.setStorageSync("calendarSignData", new Array(monthDaySize));
    };
    if (wx.getStorageSync("calendarSignDay") == null || wx.getStorageSync("calendarSignDay") == '') {
      wx.setStorageSync("calendarSignDay", 0);
    }
    calendarSignData = wx.getStorageSync("calendarSignData")
    calendarSignDay = wx.getStorageSync("calendarSignDay")
    console.log(calendarSignData);
    console.log(calendarSignDay)

    this.setData({
      year: year,
      month: month,
      nbsp: nbsp,
      monthDaySize: monthDaySize,
      date: date,
      calendarSignData: calendarSignData,
      calendarSignDay: calendarSignDay
    })
    console.log('签到之前monthDaySize' + monthDaySize);
    console.log('签到之前' + calendarSignData);
    console.log('签到之前' + calendarSignDay)
  },

  prizeAge: function () {
    wx.navigateTo({
      url: '../prize/prize',
    })
  },

  repeat_s: function () {
    wx.showToast({
      title: '今日已签到',
      icon: 'success',
      duration: 1500
    })
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      console.log("用户开放权限")
      console.log("e.detail.userInfo.nickName==" + e.detail.userInfo.nickName)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      var nk = app.globalData.userInfo.nickName;
      wx.request({
        url: 'https://www.promisem.cn/sig/admin/getsigbyid?sigName' + '=' + nk,
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          console.log(res.data)
          console.log("res.data=" + res.data.sig)
          if (res.data.sig == null) {
            console.log("用户不存在")
            var beginDay = parseInt(0)
            wx.request({
              url: 'https://www.promisem.cn/sig/admin/addsig?sigName=' + nk + '&sigDay=' + beginDay,
              data: {
                x: '',
                y: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res.data)
                console.log("用户创建成功！")
              }
            })

          } else {
            wx.setStorageSync("calendarSignDay", res.data.sig.sigDay);
            console.log("用户已存在，签了" + res.data.sig.sigDay + "天")
            this.setData({ calendarSignDay: res.data.sig.sigDay })
            this.setData({ sigId: res.data.sig.sigId })
            wx.setStorageSync("sigId", res.data.sig.sigId);
          }
        },
      })
    } else {
      console.log("用户拒绝开放权限")
    };
  },
  // 图片预览
  previewImage: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures = this.data.pictures;
    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
    })
  },
  previewImage_card: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      card_pictures = this.data.card_pictures;
    wx.previewImage({
      //当前显示下表
      current: card_pictures[index],
      //数据源
      urls: card_pictures
    })
  }
})
