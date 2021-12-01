// 获取域名
export function parseUrl (e: string): string {
  return e.replace(/^(https?:)?\/\//, '').replace(/\?.*$/, '');
}

// 获取hash值
export function parseHash (e:string): string {
  return (e ? parseUrl(e.replace(/^#\/?/, '')) : '') || '[index]';
}


// 自定义事件，并dispatch
export function dispatchCustomEvent (e: string, t:string): void {
  let evt: Event | CustomEvent;
  if (CustomEvent) {
    evt = new CustomEvent(e, {
      detail: t
    });
  } else {
    evt = window.document.createEvent('HTMLEvents');
    evt.initEvent(e, false, true);
    evt['detail'] = t;
  }
  window.dispatchEvent(evt);
}
