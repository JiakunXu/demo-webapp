// components/date-format/index.js
const dayjs = require('dayjs')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: null,
      value: Date.now()
    },
    format: {
      type: String,
      value: 'YYYY/MM/DD HH:mm:ss'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    dateTime: ""
  },

  observers: {
    'date, format': function (date, format) {
      this.format(date, format);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    format: function (date, format) {
      this.setData({
        dateTime: dayjs(date).format(format)
      })
    }
  }
})