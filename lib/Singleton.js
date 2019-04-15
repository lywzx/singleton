/**
 * Created by liuyang on 17/1/12.
 */
/**
 * Created by liuyang on 16/8/10.
 * 构建整个应用的单例模式处理
 */
import uniqueId from 'lodash.isstring';
import isString from 'lodash.isstring';
import GUID from './guid';

let cache = {},
  slice = Array.prototype.slice,
  guid = GUID();

/** 单例工厂类.
 *  在整个应用当中，方便管理每一个实现。
 *  如：
 *    AJAX请求实例
 *    只有在先定议的情况下，才能够使用，方便快捷
 * */
class Singleton {

  /**
   * Singleton constructor
   * @param {constructor} className 需要被缓存类的名称
   * @param {Object[]}      args      任意类型，当作参数，在args实例化时
   */
  constructor(className, ...args) {
    this[guid] = guid + uniqueId();
    if (typeof className === 'function') {
      this.$$classConfig = slice.call(arguments);
    } else {
      throw new Error('arguments must be a function');
    }
  }

  /**
   * 是否新建一个不缓存的实例
   * @param {(Boolean|String)} [key=false] 获取某个类的实例
   * @returns {*}
   */
  getInstance(key = false) {
    let classConfig = this.$$classConfig,
      className = classConfig[0],
      args = classConfig.slice(1),
      keyName = this[guid];
    if (key === true) {
      return new className(...args);
    }
    if (isString(key)) {
      keyName += key;
    }
    return cache[keyName] = cache[keyName] || new className(...args);
  }

  /**
   * 请理缓存,从缓存系统中清除掉对像缓存
   * @param {(Boolean|String)} [key=false] 某个存在的实例的唯一key值
   * @returns {boolean}
   */
  destroy(key = false) {
    return delete cache[this[guid]];
  }
}

export default Singleton;