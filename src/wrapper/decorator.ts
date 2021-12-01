import { Combiner } from '.';

export function trace(combiner: Combiner) {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    return {
      ...descriptor,
      value: combiner(descriptor.value)
    };
  };
}
