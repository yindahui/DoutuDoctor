// pages/diy/diy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modimglist: [
      "../../res/diy/1.jpg",
      "../../res/diy/2.jpg", 
      "../../res/diy/3.jpg", 
      "../../res/diy/4.jpg", 
      "../../res/diy/5.jpg", 
      "../../res/diy/6.jpg", 
      "../../res/diy/7.jpg", 
      "../../res/diy/8.jpg", 
      "../../res/diy/9.jpg", 
      "../../res/diy/10.jpg", 
      "../../res/diy/11.jpg", 
      "../../res/diy/12.jpg", 
      "../../res/diy/13.jpg", 
      "../../res/diy/14.jpg", 
      "../../res/diy/15.jpg", 
      "../../res/diy/16.jpg", 
      "../../res/diy/17.jpg", 
      "../../res/diy/18.jpg"
    ]
  },

  onItemClick: function (event) {
    var targetUrl = "../preimage/preimage?url=";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + event.currentTarget.dataset.url;
    wx.navigateTo({
      url: targetUrl
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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