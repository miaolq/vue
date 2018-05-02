/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 已安装过的插件不再安装
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    // Vue放入args中
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      // 执行插件的install。this指向plugin，第一个参数是Vue
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // 插件本身是个函数，执行
      plugin.apply(null, args)
    }
    //  将插件放入this._installedPlugins
    installedPlugins.push(plugin)
    return this
  }
}
