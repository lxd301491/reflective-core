import { CollectPlugin, StorePlugin, CompressPlugin, ReportPlugin, ReflectivePlugin } from './plugin';
import { PluginStage } from './plugin';
import { MonitorInfo } from './message';
import { MessageInfo } from 'src';
import { nanoid } from 'nanoid';
/**
 * the class is the core of this library
 * control the full process to upload message and define the lifecycle
 * inject the plugins for more extra function
 */
export class Reflective {
  private collectors: CollectPlugin[] = [];
  private store: StorePlugin = null;
  private compressor: CompressPlugin = null;
  private reporters: ReportPlugin[] = [];
  private frameInterval = 5;
  private frameSize = 10;

  constructor(frameInterval: number, frameSize: number) {
    this.frameInterval = frameInterval;
    this.frameSize = frameSize;
    setTimeout(this.frame.bind(this), this.frameInterval);
  }

  public inject(plugin: ReflectivePlugin): void {
    plugin.install(this);
    switch (plugin.stage) {
    case PluginStage.Collect:
      this.collectors.push(plugin as CollectPlugin);
      break;
    case PluginStage.Store:
      this.store = plugin as StorePlugin;
      break;
    case PluginStage.Compress:
      this.compressor = plugin as CompressPlugin;
      break;
    case PluginStage.Report:
      this.reporters.push(plugin as ReportPlugin);
      break;
    default:
      console.error('unknown plugin stage!');
    }
  }

  public collect(message: MessageInfo): void {
    const monitorInfo: MonitorInfo = {
      id: nanoid(),
      ...message
    };
    if (this.store) {
      this.store.store(monitorInfo);
    } else {
      const data: string = this.compressor?.compress([monitorInfo]) || JSON.stringify(monitorInfo);
      this.reporters.forEach(reporter => {
        reporter.report(data);
      });
    }
  }

  private frame() {
    const messages: MonitorInfo[] = this.store?.extract(this.frameSize);
    const data: string = this.compressor?.compress(messages) || JSON.stringify(messages);
    this.reporters.forEach(reporter => {
      reporter.report(data);
    });
  }
}
