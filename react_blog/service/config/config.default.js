/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610936934341_2680';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.security = {
    csrf:{
      enable:false
    }, //egg提供的安全机制
    domainWhiteList:['*']
  };
  config.cors={
    origin:'http://localhost:3000' ,//允许哪些域名可以跨域访问
    allowMethods:'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', //允许哪些请求可以跨域
    credentials: true //允许Cookis可以跨域
  };
  return {
    ...config,
    ...userConfig,
  };
};
