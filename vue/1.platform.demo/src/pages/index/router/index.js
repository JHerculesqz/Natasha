import Vue from 'vue'
import Router from 'vue-router'
import Page0 from '../components/Page0'

/*region 解决vue-router^3.0.1当前页跳转到当前页NavigationDuplicated bug*/
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
/*endregion*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page0',
      component: Page0
    }
  ]
})
