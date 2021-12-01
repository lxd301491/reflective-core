export type CommonFn = (this: unknown, ...args: unknown[]) => unknown;

export type Combiner = (target: CommonFn) => CommonFn;

export type Wrapper = (target: CommonFn | string) => { wrap: Combiner, unwrap: Combiner }

/**
 * 对目标函数进行包装，进行函数前的预处理
 *
 * @param beforeFn 执行目标函数前，先需要执行的函数，返回值必须是目标函数的参数数组
 * @returns 被包装后的函数
 */
export const before: Wrapper = (beforeFn: CommonFn) => {
  return {
    wrap: (target?: CommonFn): CommonFn => {
      const newFn = function (this: unknown, ...args: unknown[]) {
        try {
          args = beforeFn.apply(this, args);
        } catch (e) {
          // empty
        }
        return newFn.prototype.$originFn && newFn.prototype.$originFn.apply(this, args);
      };
      newFn.prototype.$beforeFn = beforeFn;
      newFn.prototype.$originFn = target;
      return newFn;
    },
    unwrap: (target: CommonFn): CommonFn => {
      /**
       * 没有beforeFn，说明没有被包装，直接返回对象
       */
      if (!target.prototype.$beforeFn) {
        return target;
      }
      /**
       * 判断对象是否是一级包装，如果是的话直接返回次级函数
       */
      if (target.prototype.$beforeFn == beforeFn) {
        return target.prototype.$originFn;
      }
      /**
       * 判断是否是多级包装，如果是，则进行判断子originFn的beforeFn是否是要拆装
       * 将子originFn的设置为其子originFn
       */
      let originFn = target;
      while (originFn.prototype.$originFn.prototype.$beforeFn && originFn.prototype.$originFn.prototype.$beforeFn != beforeFn) {
        originFn = originFn.prototype.$originFn;
      }
      if (originFn.prototype.$beforeFn) {
        originFn.prototype.$originFn = originFn.prototype.$originFn.prototype.$originFn;
      }
      return target;
    }
  };
};

export const after: Wrapper = (afterFn: CommonFn) => {
  return {
    wrap: (target?: CommonFn): CommonFn => {
      const newFn = function (this: unknown, ...args: unknown[]) {
        const result = newFn.prototype.$originFn && newFn.prototype.$originFn.apply(this, args);
        try {
          return afterFn.apply(this, [...args, result]);
        } catch (e) {
          // empty
        }
        return result;
      };
      newFn.prototype.$afterFn = afterFn;
      newFn.prototype.$originFn = target;
      return newFn;
    },
    unwrap: (target: CommonFn): CommonFn => {
      /**
       * 没有afterFn，说明没有被包装，直接返回对象
       */
      if (!target.prototype.$afterFn) {
        return target;
      }
      /**
       * 判断对象是否是一级包装，如果是的话直接返回次级函数
       */
      if (target.prototype.$afterFn == afterFn) {
        return target.prototype.$originFn;
      }
      /**
       * 判断是否是多级包装，如果是，则进行判断子originFn的afterFn是否是要拆装
       * 将子originFn的设置为其子originFn
       */
      let originFn = target;
      while (originFn.prototype.$originFn.prototype.$afterFn && originFn.prototype.$originFn.prototype.$afterFn != afterFn) {
        originFn = originFn.prototype.$originFn;
      }
      if (originFn.prototype.$afterFn) {
        originFn.prototype.$originFn = originFn.prototype.$originFn.prototype.$originFn;
      }
      return target;
    }
  };
};
