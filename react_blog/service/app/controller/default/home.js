'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
   this.ctx.body="api hi"
  }
  async getArticlelist(){
      let sql='SELECT article.id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              "FROM_UNIXTIME(article.addTime*1000,'%Y-%m-%d %H:%i:%s') as addTime ,"+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id'

      let results = await this.app.mysql.query(sql)
      this.ctx.body={data:results}
  }
  async getArticleById(){
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
  //得到类别名称和编号
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = { data:result}
  }

  //根据类别id获得文章列表
  async getListById(){
    let id = this.ctx.params.id
    let sql='SELECT article.id as id ,'+
    'article.title as title ,'+
    'article.introduce as introduce ,'+
    "FROM_UNIXTIME(article.addTime*1000,'%Y-%m-%d %H:%i:%s') as addTime ,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE type_id='+id
    let results = await this.app.mysql.query(sql)
    this.ctx.body={data:results}
  }
}
module.exports = HomeController;

//RESTful 最流行的网络应用程序设计风格和开发方式 接口设计风格
//APP 前后端分离 简单 和约束性
//请求方式 get获取 post新建 put更新 delete删除

//连接数据库 egg-mysql 需要安装库