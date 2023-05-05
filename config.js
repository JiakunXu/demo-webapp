/**
 * 小程序配置文件
 */

var appId = '';

var host = 'https://';

var config = {
  appId,

  service: {
    host,

    baseUrl: `${host}`,

    // 登录地址，用于建立会话
    loginUrl: `${host}/wx/login?appId=${appId}`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/upload`
  }
};

module.exports = config;