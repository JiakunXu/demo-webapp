var constants = require('./constants');
var utils = require('./utils');
var Session = require('./session');
var loginLib = require('./login');

var noop = function noop() {};

var buildAuthHeader = function buildAuthHeader(session) {
    var header = {};

    if (session) {
        header[constants.WX_HEADER_SKEY] = "Bearer " + session;
    }

    return header;
};

/***
 * @class
 * 表示请求过程中发生的异常
 */
var RequestError = (function () {
    function RequestError(type, message) {
        Error.call(this, message);
        this.type = type;
        this.message = message;
    }

    RequestError.prototype = new Error();
    RequestError.prototype.constructor = RequestError;

    return RequestError;
})();

function request(options) {
    if (typeof options !== 'object') {
        var message = '请求传参应为 object 类型，但实际传了 ' + (typeof options) + ' 类型';
        throw new RequestError(constants.ERR_INVALID_PARAMS, message);
    }

    var requireLogin = options.login;
    var success = options.success || noop;
    var fail = options.fail || noop;
    var complete = options.complete || noop;
    var originHeader = options.header || {};

    // 成功回调
    var callSuccess = function () {
        success.apply(null, arguments);
        complete.apply(null, arguments);
    };

    // 失败回调
    var callFail = function (error) {
        fail.call(null, error);
        complete.call(null, error);
    };

    // 是否已经进行过重试
    var hasRetried = false;

    if (requireLogin) {
        doRequestWithLogin();
    } else {
        doRequest();
    }

    // 登录后再请求
    function doRequestWithLogin() {
        loginLib.loginWithCode({ success: doRequest, fail: callFail });
    }

    // 实际进行请求的方法
    function doRequest() {
        var authHeader = {}

        var session = Session.get();
    
        if (session) {
            authHeader = buildAuthHeader(session);
        }

        wx.request(utils.extend({}, options, {
            header: utils.extend({}, originHeader, authHeader),

            success: function (response) {
                var data = response.data;

                if ((data && data.code === 401) || response.statusCode === 401) {
                    Session.clear();
                    wx.showModal({
                      title: '系统提示',
                      content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
                      cancelText: '取消',
                      confirmText: '重新登录',
                      success (res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '/pages/login/login'
                          });
                        }
                      }
                    });

                    callFail(data);
                    return;
                } else if (data && data.code !== 200) {
                    wx.showModal({
                      title: '温馨提示',
                      content: data.msg,
                      showCancel: false
                    });

                    callFail(data);
                    return;
                } else {
                    callSuccess(data);
                }
            },

            fail: callFail,
            complete: noop,
        }));
    };

};

module.exports = {
    RequestError: RequestError,
    request: request,
};