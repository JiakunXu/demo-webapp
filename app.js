// app.js
const sdk = require('./wafer2-client-sdk/index')
const config = require('./config')

import EventChannel from '/common/EventChannel'
import updateManager from '/common/updateManager';

const eventChannel = new EventChannel();

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  onShow() {
    updateManager();
  },

  globalData: {
    userInfo: null
  },

  $emit: (eventName, ...args) => {
    eventChannel.emit(eventName, ...args);
  },

  $off: (eventName, fn) => {
    eventChannel.off(eventName, fn);
  },

  $on: (eventName, fn) => {
    eventChannel.on(eventName, fn);
  },

  $once: (eventName, fn) => {
    eventChannel.once(eventName, fn);
  }
})
