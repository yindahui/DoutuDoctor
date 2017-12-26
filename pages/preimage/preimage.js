//index.js
//获取应用实例
var app = getApp();


Page({
  data: {
    //控件相关，包括显示隐藏属性
    element_charac: ['element_hide', 'element_show'],

    imglist: [],
    src: ['../../res/qq.png'],
    windowHeight: 0,
    windowWidth: 0,
    imgpath: '../../res/qq.png',
    hasmake: 0,

    //图片
    picX: 0,
    picY: 0,
    picW: 250,
    picH: 250,

    //文字颜色相关
    txtcolor: 'Red',
    txtcolorlist: ['Red', 'Black', 'Blue', 'Orange', 'Yellow', 'RebeccaPurple'],
    txtcolorname: ['红色', '黑色', '蓝色', '橙色', '黄色', '紫色'],
    txtcolor_HS: 0, //文字颜色控件显示或隐藏，0代表隐藏，1代表显示

    //文字大小相关
    txtsize: 20,
    txtsizelist: [20, 40, 60],
    txtsizename: ['小', '中', '大'],
    txtsize_HS: 0, //文字大小控件显示或隐藏，0代表隐藏，1代表显示

    //文字位置相关
    txtlocation: 1,
    txtlocationlist: [1, 2, 3],
    txtlocationname: ['下', '中', '上'],
    txtlocation_HS: 0, //文字大小控件显示或隐藏，0代表隐藏，1代表显示

    //属性设置总开关
    txt_HS: 1,
    uploadpic_HS: 1,

    //输入内容
    douyu: "微信小程序 - 斗图专家"


  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    if (options != null) {
      if (options.url != null) {
        that.setData({
          imgpath: options.url,
          src: [options.url],
          uploadpic_HS: 0

        })
      }
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          imgpath: that.data.src[0],
          picX: (res.windowWidth - that.data.picW) / 2
        });
        const ctx = wx.createCanvasContext('myCanvas')
        ctx.drawImage(that.data.imgpath, that.data.picX, that.data.picY, that.data.picW, that.data.picH);
        ctx.draw()
      }
    });
    
  },

  previewImage: function (event) {
    var that = this;
    if (that.data.hasmake) {
      wx.previewImage({
        current: "", // 当前显示图片的http链接
        urls: [that.data.imgpath] // 需要预览的图片http链接列表
      });
    }
  },
  showToast: function () {
    wx.showToast({
      title: '请点击一键制作',
      icon: 'success',
      duration: 1000
    });
  },

  chooseImage: function (e) {

    var that = this
    const ctx = wx.createCanvasContext('myCanvas')
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        //console.log(res)
        ctx.drawImage(res.tempFilePaths[0], that.data.picX, that.data.picY, that.data.picW, that.data.picH);
        ctx.draw()
        that.setData({
          src: res.tempFilePaths
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '微信小程序-斗图专家',
      desc: '和朋友们一起快乐的斗图吧'
    }
  },

  settxtcolor: function () {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.txtcolorname,
      //colorlist: ['Red', 'Black', 'Blue', 'White', 'Yellow', 'Violet', 'RebeccaPurple'],
      success: function (res) {
        if (!res.cancel) {
          //console.log(res.tapIndex)
          that.setData({
            txtcolor: that.data.txtcolorlist[res.tapIndex]
          });
          that.makeimg();
        }
      }
    });
  },
  settxtsize: function () {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.txtsizename,
      //colorlist: ['Red', 'Black', 'Blue', 'White', 'Yellow', 'Violet', 'RebeccaPurple'],
      success: function (res) {
        if (!res.cancel) {
          //console.log(res.tapIndex)
          that.setData({
            txtsize: that.data.txtsizelist[res.tapIndex]
          });
          that.makeimg();

        }
      }
    });
  },

  settxtlocation: function () {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.txtlocationname,
      //colorlist: ['Red', 'Black', 'Blue', 'White', 'Yellow', 'Violet', 'RebeccaPurple'],
      success: function (res) {
        if (!res.cancel) {
          //console.log(res.tapIndex)
          that.setData({
            txtlocation: that.data.txtlocationlist[res.tapIndex]
          });
          that.makeimg();
        }

      }
    });

  },

  //控制txt属性控件开关,点击后，自身隐藏，开启三个属性
  setattributes: function () {
    var that = this;
    that.setData({
      txtcolor_HS: 1,
      txtsize_HS: 1,
      txtlocation_HS: 1,
      txt_HS: 0

    });
  },



  ///////


  //文字动态监控：
  txtinput: function (e) {
    this.setData({
      douyu: e.detail.value
    })
    this.makeimg()
  },


  makeimg: function () {
    var that = this;
    const ctx = wx.createCanvasContext('myCanvas')
    var txt = that.data.douyu
    if (txt == "") {
      txt = "微信小程序 - 斗图专家"
    }
    ctx.drawImage(that.data.src[0], that.data.picX, that.data.picY, that.data.picW, that.data.picH)
    ctx.setFontSize(that.data.txtsize)
    ctx.setFillStyle(that.data.txtcolor)

    //画上文字

    var X, Y;
    X = that.data.windowWidth / 2;
    ctx.setTextAlign('center');
    //上
    if (that.data.txtlocation == 1) {//下
      ctx.setTextBaseline('bottom');
      Y = that.data.picH;
    } else if (that.data.txtlocation == 2) {//中
      ctx.setTextBaseline('middle');
      Y = that.data.picH / 2;
    } else if (that.data.txtlocation == 3) {//上
      ctx.setTextBaseline('top');
      Y = 0;
    }
    ctx.fillText(txt, X, Y)
    ctx.draw()
  },

  //生成自定义表情
  makepic: function () {
    var that = this;
    const ctx = wx.createCanvasContext('myCanvas')
    that.makeimg()
    wx.canvasToTempFilePath({
      x: that.data.picX,
      y: that.data.picY,
      width: that.data.picW,
      height: that.data.picH,
      destWidth: that.data.picW,
      destHeight: that.data.picH,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          imgpath: res.tempFilePath,
          hasmake: 1
        });
        that.setData({
          txtcolor_HS: 0,
          txtsize_HS: 0,
          txtlocation_HS: 0,
          txt_HS: 1

        });
        wx.previewImage({
          current: "", // 当前显示图片的http链接
          urls: [that.data.imgpath] // 需要预览的图片http链接列表
        });
      }
    })

  },

});


