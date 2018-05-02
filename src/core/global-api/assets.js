/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // 初始化 Vue的'component','directive','filter'方法
  ASSET_TYPES.forEach(type => {
    Vue[type] = function(
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        // 没传定义，则从options中查找
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          // 组件名name优先
          definition.name = definition.name || id
          // Vue.extend(definition) 创建全局组件
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 放入options
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
