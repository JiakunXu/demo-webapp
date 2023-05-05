module.exports = Behavior({

  methods: {

    onClickLeft: function () {
      if (getCurrentPages().length == 1) {
        wx.redirectTo({
          url: "/pages/index/index"
        });
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
});