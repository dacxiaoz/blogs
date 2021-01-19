'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async list(){
    const { ctx } = this;
    ctx.body = "<h1>blog list</h1>"
  }
}

module.exports = HomeController;

//RESTful 最流行的网络应用程序设计风格和开发方式 接口设计风格
//APP 前后端分离 简单 和约束性
//请求方式 get获取 post新建 put更新 delete删除

