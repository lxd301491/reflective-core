import { Reflective } from './reflective';
import { MonitorInfo } from './message';

/**
 * 插件基本行为
 */
export enum PluginStage {
  Collect,
  Store,
  Compress,
  Report
}

export interface ReflectivePlugin {
  stage: PluginStage;
  install(r: Reflective): void;
  uninstall(r: Reflective): void;
}

export type CollectPlugin = ReflectivePlugin

export interface StorePlugin extends ReflectivePlugin {
  store(message: MonitorInfo): void;
  extract(size: number): MonitorInfo[];
}

export interface CompressPlugin extends ReflectivePlugin {
  compress(messages: MonitorInfo[]): string;
}

export interface ReportPlugin extends ReflectivePlugin {
  report(data: string): void;
}
