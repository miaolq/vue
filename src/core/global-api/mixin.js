/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    // merge mixin和options
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
