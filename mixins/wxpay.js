module.exports = Behavior({

  methods: {

    /**
     * 
     * @param {*} wxpay 
     * @param {*} callback 
     */
    requestPayment: function (wxpay, callback) {
      wx.requestPayment({
        timeStamp: wxpay.timeStamp,
        nonceStr: wxpay.nonceStr,
        package: wxpay.package,
        signType: wxpay.signType,
        paySign: wxpay.paySign,
        success: (res) => {
          callback && callback(res);
        },
        fail: (res) => {
          if (res.errMsg == 'requestPayment:fail cancel') {
            wx.showToast({
              title: '取消支付',
              icon: 'error',
              duration: 2000
            });
          } else {
            wx.showModal({
              title: '温馨提示',
              content: res.errMsg,
              showCancel: false
            });
          }
        }
      });
    }
  }
});