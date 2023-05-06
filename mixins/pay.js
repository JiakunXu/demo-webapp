const sdk = require('../wafer2-client-sdk/index')
const wxpay = require('wxpay')
const config = require('../config')

module.exports = Behavior({

  methods: {

    /**
     * 
     * @param {*} tradeNo 
     */
    pay: function (tradeNo, callback) {
      sdk.request({
        url: config.service.baseUrl + '/wxpay/pay',
        data: {
          tradeNo
        },
        method: 'POST',
        success: (res) => {
          if (res.data.code == 200) {
            this.requestPayment(JSON.parse(res.data), callback);
          } else {
            wx.showModal({
              title: '温馨提示',
              content: res.data.msg,
              showCancel: false
            });
          }
        },
        fail: (error) => {
          wx.showModal({
            title: '请求失败',
            content: error,
            showCancel: false
          });
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    }
  },

  behaviors: [wxpay]
});