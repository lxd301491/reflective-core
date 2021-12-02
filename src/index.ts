export { trace } from './wrapper/decorator';
export { before, after, CommonFn, Combiner, Wrapper } from './wrapper';
export { traversal } from './helper/dom';
export { now } from './helper/time';
export { parseUrl } from './helper/url';
export { Reflective }  from './reflective';

export {
  InfoLvl,
  ExceptionInfo,
  PerformanceInfo,
  PointerInfo,
  KeyInfo,
  ActionInfo,
  CustomInfo,
  MonitorInfo,
  MessageInfo
} from './message';

export {
  PluginStage,
  ReflectivePlugin,
  CollectPlugin,
  StorePlugin,
  CompressPlugin,
  ReportPlugin
} from './plugin';

export type touch = 'touchstart' | 'touchend' | 'touchmove';
export type mouse = 'mousedown' | 'mouseup' | 'mouseenter' | 'mouseleave' | 'mouseover' | 'click' | 'dblclick' | 'focus' | 'blur';
export type keyboard = 'keydown' | 'keyup' | 'keypress' | 'input' | 'change';
export type actions = touch | mouse | keyboard;

