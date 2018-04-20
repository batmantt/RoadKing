var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
var number_xfs;
var number_mm;
var number_xjj;
var time;
var day;
var buyed;
Page({
  data: {
    xjj_pictures:
    ['https://www.promisem.cn/image/shoppingImg/bodyWash.jpg'],
    mm_pictures:
    ['https://www.promisem.cn/image/shoppingImg/shampoo.jpg'],
    xfs_pictures:
    ['https://www.promisem.cn/image/shoppingImg/facialMask.jpg'],
    day,
    time,
    percent: 100,
    distanceEndTime: "13:00",
    distanceEndTime1: "14:00",
    distanceEndTime2: "15:00",
    number_xfs,
    number_mm,
    number_xjj,
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    buyed,
  },
  onShareAppMessage: function () {
    return {
      title: '路劲又一城开业抢购',
      desc: '路劲又一城苏州吴江开业抢购!',
      path: '/pages/flashSale/flashSale'
    }
  },
  previewImage_xjj: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      xjj_pictures = this.data.xjj_pictures;
    wx.previewImage({
      //当前显示下表
      current: xjj_pictures[index],
      //数据源
      urls: xjj_pictures
    })
  },
  previewImage_mm: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      mm_pictures = this.data.mm_pictures;
    wx.previewImage({
      //当前显示下表
      current: mm_pictures[index],
      //数据源
      urls: mm_pictures
    })
  },
  previewImage_xfs: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      xfs_pictures = this.data.xfs_pictures;
    wx.previewImage({
      //当前显示下表
      current: xfs_pictures[index],
      //数据源
      urls: xfs_pictures
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    wx.request({
      url: 'https://www.promisem.cn/seckill/seckill/listsec',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data.list)
        var xfs = (((res.data.list[2].number) / 50) * 100).toFixed(0)
        var mm = (((res.data.list[1].number) / 100) * 100).toFixed(0)
        var xjj = (((res.data.list[0].number) / 250) * 100).toFixed(0)
        this.setData({
          number_xfs: xfs,
          number_mm: mm,
          number_xjj: xjj,
        })
      }
    })
  },
  onLoad: function () {
    wx.request({
      url: 'https://www.promisem.cn/seckill/seckill/listsec',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data.list)
        var xfs = (((res.data.list[2].number) / 50) * 100).toFixed(0)
        var mm = (((res.data.list[1].number) / 100) * 100).toFixed(0)
        var xjj = (((res.data.list[0].number) / 250) * 100).toFixed(0)
        this.setData({
          number_xfs: xfs,
          number_mm: mm,
          number_xjj: xjj,
        })
      }
    })
    if (app.globalData.userInfo) {
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
    wx.request({
      url: 'https://www.promisem.cn/newday/seckill/time/nowday',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log("获取的时间（日）" + res.data.data)
        this.setData({
          day: res.data.data
        })
      }
    })

  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      console.log("用户拒绝开放权限")
    }
  },
  Immediate_buyed: function () {
    console.log('您已经成功抢购')
    wx.showModal({
      title: '提示',
      content: '您已经成功抢购',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //1524114000000    2018-04-19 13:00:00  
  //1524114300000    2018-04-19 13:05:00
  //1524114600000    2018-04-19 13:10:00
  //1524114900000    2018-04-19 13:15:00


  //1524200400000    2018-04-20 13:00:00
  //1524200700000    2018-04-20 13:05:00
  //1524201000000    2018-04-20 13:10:00
  //1524201300000    2018-04-20 13:15:00


  //1524067200000    2018-04-19
  //1524153600000    2018-04-20

  // 洗洁精抢购判断
  // ************************************************************
  Immediate_buy_xjj: function () {

    //1524067200000    2018-04-19

    if (this.data.day == 1524067200000) {
      console.log("今天可以抢购")
      wx.request({
        url: 'https://www.promisem.cn/seckill/seckill/time/now',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            time: res.data.data
          })
          console.log("系统时间" + res.data.data)
          
          //1524114000000    2018-04-19 13:00:00 

          if (this.data.time < 1524114000000) {
            wx.showModal({
              title: '提示',
              content: '抢购未开始',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

            //1524114300000    2018-04-19 13:05:00

          } else if (this.data.time > 1524114300000) {
            wx.showModal({
              title: '提示',
              content: '抢购已结束',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            console.log("时间符合，已进入购买")
            var name = app.globalData.userInfo.nickName
            console.log(name)
            wx.request({
              url: 'https://www.promisem.cn/seckill/seckill/' + 1002 + '/' + name + '/execution',
              data: {
                x: '',
                y: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: res => {
                if (res.data.data.stateInfo == "秒杀成功") {
                  wx.showModal({
                    title: '提示',
                    content: '请到公众号完成付款',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                          url: '../mine/mine',
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })

      //1524153600000    2018-04-20

    } else if (this.data.day == 1524153600000) {
      wx.request({
        url: 'https://www.promisem.cn/seckill/seckill/time/now',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            time: res.data.data
          })
          console.log("系统时间" + res.data.data)

          //1524200400000    2018-04-20 13:00:00

          if (this.data.time < 1524200400000) {
            wx.showModal({
              title: '提示',
              content: '抢购未开始',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

            //1524200700000    2018-04-20 13:05:00

          } else if (this.data.time > 1524200700000) {
            wx.showModal({
              title: '提示',
              content: '抢购已结束',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            var name = app.globalData.userInfo.nickName
            console.log(name)
            wx.request({
              url: 'https://www.promisem.cn/seckill/seckill/' + 1002 + '/' + name + '/execution',
              data: {
                x: '',
                y: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                if (res.data.data.stateInfo == "秒杀成功") {
                  wx.showModal({
                    title: '提示',
                    content: '请到公众号完成付款',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                          url: '../mine/mine',
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
            })

          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '抢购未开始',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  // 面膜抢购
  Immediate_buy_mm: function () {

    //1524067200000    2018-04-19

    if (this.data.day == 1524067200000) {
      wx.request({
        url: 'https://www.promisem.cn/seckill/seckill/time/now',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            time: res.data.data
          })
          console.log("系统时间" + res.data.data)

          //1524114300000    2018-04-19 13:05:00

          if (this.data.time < 1524114300000) {
            wx.showModal({
              title: '提示',
              content: '抢购未开始',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

            //1524114600000    2018-04-19 13:10:00

          } else if (this.data.time > 1524114600000) {
            wx.showModal({
              title: '提示',
              content: '抢购已结束',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            var name = app.globalData.userInfo.nickName
            console.log(name)
            wx.request({
              url: 'https://www.promisem.cn/seckill/seckill/' + 1001 + '/' + name + '/execution',
              data: {
                x: '',
                y: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                if (res.data.data.stateInfo == "秒杀成功") {
                  wx.showModal({
                    title: '提示',
                    content: '请到公众号完成付款',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                          url: '../mine/mine',
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
            })

          }
        }
      })

      //1524153600000    2018-04-20

    } else if (this.data.day == 1524153600000) {
      wx.request({
        url: 'https://www.promisem.cn/seckill/seckill/time/now',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            time: res.data.data
          })

          //1524200700000    2018-04-20 13:05:00

          if (this.data.time < 1524200700000) {
            wx.showModal({
              title: '提示',
              content: '抢购未开始',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

            //1524201000000    2018-04-20 13:10:00

          } else if (this.data.time > 1524201000000) {
            wx.showModal({
              title: '提示',
              content: '抢购已结束',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            var name = app.globalData.userInfo.nickName
            console.log(name)
            wx.request({
              url: 'https://www.promisem.cn/seckill/seckill/' + 1001 + '/' + name + '/execution',
              data: {
                x: '',
                y: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                if (res.data.data.stateInfo == "秒杀成功") {
                  wx.showModal({
                    title: '提示',
                    content: '请到公众号完成付款',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                          url: '../mine/mine',
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
            })

          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '抢购未开始',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  //洗发水抢购
  Immediate_buy_xfs: function () {

    //1524067200000    2018-04-19

    if (this.data.day == 1524067200000) {
      wx.request({
        url: 'https://www.promisem.cn/seckill/seckill/time/now',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            time: res.data.data
          })
          console.log("系统时间" + res.data.data)

          //1524114600000    2018-04-19 13:10:00

          if (this.data.time < 1524114600000) {
            wx.showModal({
              title: '提示',
              content: '抢购未开始',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

            //1524114900000    2018-04-19 13:15:00

          } else if (this.data.time > 1524114900000) {
            wx.showModal({
              title: '提示',
              content: '抢购已结束',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            var name = app.globalData.userInfo.nickName
            console.log(name)
            wx.request({
              url: 'https://www.promisem.cn/seckill/seckill/' + 1000 + '/' + name + '/execution',
              data: {
                x: '',
                y: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                if (res.data.data.stateInfo == "秒杀成功") {
                  wx.showModal({
                    title: '提示',
                    content: '请到公众号完成付款',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                          url: '../mine/mine',
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
            })

          }
        }
      })

      //1524153600000    2018-04-20

    } else if (this.data.day == 1524153600000) {
      wx.request({
        url: 'https://www.promisem.cn/seckill/seckill/time/now',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            time: res.data.data
          })
          console.log("系统时间" + res.data.data)

          //1524201000000    2018-04-20 13:10:00

          if (this.data.time < 1524201000000) {
            wx.showModal({
              title: '提示',
              content: '抢购未开始',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

            //1524201300000   2018-04-20 13:15:00

          } else if (this.data.time > 1524201300000) {
            wx.showModal({
              title: '提示',
              content: '抢购已结束',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            var name = app.globalData.userInfo.nickName
            console.log(name)
            wx.request({
              url: 'https://www.promisem.cn/seckill/seckill/' + 1000 + '/' + name + '/execution',
              data: {
                x: '',
                y: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                if (res.data.data.stateInfo == "秒杀成功") {
                  wx.showModal({
                    title: '提示',
                    content: '请到公众号完成付款',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                          url: '../mine/mine',
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '抢购未开始',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
})
