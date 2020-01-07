'use strict'

const Controller = require('egg').Controller
class MainController extends Controller {
    async index () {
        this.ctx.body = 'hi api'
    }
    /* 登录 */
    async checkLogin () {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = 'SELECT userName FROM admin_user WHERE userName = "'
         + userName + '" AND password = "' + password + '"'
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { data: '登录成功', openId: openId}
        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }
    /* 后台文章分类信息 */
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType }
    }
    /* 添加文章 */
    async addArticle () {
        let tempArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tempArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId,
        }
    }
    /* 修改文章 */
    async updateArticle () {
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', tmpArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }
    /* 获取文章列表 */
    async getArticleList () {
        let sql = 'SELECT article.id as id,' +
                  'article.title as title,' +
                  'article.add_time as addTime,' +
                  'article.view_count as viewCount,' +
                  'type.typeName as typeName ' + 
                  'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                  'ORDER BY article.id DESC'
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { list: result }
    }
    /* 删除文章 */
    async deleteArticle () {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', {id})
        this.ctx.body = { data: res }
    }
    /* 获取文章详情 */
    async getArticleById () {
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,' +
                  'article.title as title,' +
                  'article.article_content as article_content,' +
                  'article.add_time as add_time,' +
                  'article.introduce as introduce,' +
                  'article.view_count as view_count,' +
                  'type.typeName as typeName,' +
                  'type.id as typeId ' +
                  'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                  'WHERE article.id = ' + id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }
}
module.exports = MainController