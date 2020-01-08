module.exports =  app => {
    const { router, controller } = app
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index', controller.admin.main.index)
    router.post('/admin/checkOpenId', controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)
    router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle)
    router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList)
    router.get('/admin/deleteArticle/:id', adminauth, controller.admin.main.deleteArticle)
    router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById)

    router.get('/admin/getUsers', adminauth, controller.admin.user.getUsers)
    router.post('/admin/updateUser', adminauth, controller.admin.user.updateUser)
    router.get('/admin/deleteUser/:id', adminauth, controller.admin.user.deleteUser)
    router.post('/admin/addUser', adminauth, controller.admin.user.addUser)
    router.get('/admin/exitLogin', adminauth, controller.admin.user.exitLogin)
}
