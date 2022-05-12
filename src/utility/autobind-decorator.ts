// Autobind decorator
export function AutoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    // MEMO: when value of propertydescriptor (ie. calling the method) is asked,
    // get method triggers, so binding the this should be done there
    get() {
      return originalMethod.bind(this);
    },
  };
  return adjustedDescriptor;
}
