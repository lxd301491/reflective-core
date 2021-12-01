export type InfoLvl = 'info' | 'warn' | 'error';

/**
 * 基本信息
 */
export interface BasicInfo {
  // 消息等级
  lvl: InfoLvl,
  // sessionId
  sid?: string,
  ip?: string,
  // cityCode
  cid?: string,
  // cityName
  cn?: string,
  // 平台
  pf: string,
  // user agent
  ag: string,
  // url
  url?: string,
  // title
  tt?: string,
  // 上一个访问url
  rr?: string,
  // 屏幕高度
  sh?: number,
  // 屏幕宽度
  sw?: number,
  // 语言
  lg?: string
}
/**
 * 异常埋点
 */
export interface ExceptionInfo extends BasicInfo {
  msg: string,
  stack: string,
}
/**
 * 性能埋点
 */
export interface PerformanceInfo extends BasicInfo {
  // redirect
  rt: number,
  // appCache
  ac: number,
  // dnsTime
  dns: number,
  // tcpTime
  tcp: number,
  // dom load
  dl: number,
  // dom parse
  dp: number,
  // firstPaintTime
  fp: number,
  // dom ready
  dr: number,
  // loadTime
  lt: number,
}
/**
 * 点击埋点
 */
export interface PointerInfo extends BasicInfo {
  cx: number,
  cy: number,
  px?: number,
  py?: number,
  sx?: number,
  sy?: number,
  type: string,
  el: string
}
/**
 * 输入埋点
 */
export interface KeyInfo extends BasicInfo {
  data: string,
  type: string
}
/**
 * 用户行为埋点
 */
export type ActionInfo = PointerInfo | KeyInfo;

/**
 * 自定义埋点
 */
export interface CustomInfo {
  [key: string]: string
}

export interface MonitorInfo {
  id: string,
  ei?: ExceptionInfo,
  pi?: PerformanceInfo,
  ci?: CustomInfo,
  pti?: PointerInfo,
  ki?: KeyInfo,
}

export type MessageInfo = ExceptionInfo | PerformanceInfo | ActionInfo |  CustomInfo;
