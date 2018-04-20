// pages/prize/prize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures_face: [
      'https://www.promisem.cn/image/prize/prize_img_face.png'
    ],
    pictures_back: [
      'https://www.promisem.cn/image/prize/prize_img_back_a.png'
    ]
  },
  previewImage_face: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures_face = this.data.pictures_face;
    wx.previewImage({
      //当前显示下表
      current: pictures_face[index],
      //数据源
      urls: pictures_face
    })
  },
  previewImage_back: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures_back = this.data.pictures_back;
    wx.previewImage({
      //当前显示下表
      current: pictures_back[index],
      //数据源
      urls: pictures_back
    })
  }
})