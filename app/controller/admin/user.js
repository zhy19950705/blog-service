'use strict';
const Controller = require('egg').Controller
class UserController extends Controller {
    async index () {
        this.ctx.body = 'users'
    }
    async getUsers () {
        const sql = 'SELECT admin_user.id as id,' +
                    'admin_user.userName as userName,' +
                    'admin_user.lastLogin as lastLogin ' +
                    'FROM admin_user'
        const res = await this.app.mysql.query(sql)
        this.ctx.body = { data: res }
    }
    async addUser () {
        const { userName, password } = this.ctx.request.body
        const res = await this.app.mysql.select('admin_user', {
            where: { userName }
        })
        if (res.length > 0) {
            return this.ctx.body = { message: '已存在该用户' }
        }
        const addResult = await this.app.mysql.insert('admin_user', { userName, password })
        if (addResult.affectedRows === 1) {
            return this.ctx.body = { code: 1 }
        }
        return this.ctx.body = { message: '新增用户失败' }
    }
    async updateUser () {
        const { id, userName, oldPwd, newPwd } = this.ctx.request.body
        const user = await this.app.mysql.select('admin_user', {
            where: { userName, password: oldPwd }
        })
        console.log(user)
        if (user.length === 0) {
            return this.ctx.body = { message: '原密码错误' }
        }
        let newUser = {
            id,
            userName,
            password: newPwd,
        }
        const res = await this.app.mysql.update('admin_user', newUser)
        this.ctx.body = {code: 1}
    }
    async deleteUser () {
        const id = this.ctx.params.id
        const result = await this.app.mysql.delete('admin_user', {
            id,
        })
        this.ctx.body = {
            data: result
        }
    }
    async exitLogin () {
        const { id } = this.ctx.request.body
        this.ctx.session.openId = ''
        this.ctx.body = {code: 1}
    }
}
module.exports = UserController