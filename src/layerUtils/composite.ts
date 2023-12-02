import type { ICompositeFixedValue, IImmutableComposite } from "@/interfaces/IComposite";

function getItemByName<T extends IImmutableComposite<any>>(composite: IImmutableComposite<T>, name: string) {
  return composite.get(name)
}

function getAllItems<T extends IImmutableComposite<any>>(composite: IImmutableComposite<T>): T[] {
  return composite.getAllList()
}

function addItem<T extends IImmutableComposite<any>>(composite: ICompositeFixedValue<T>, item: T) {
  return composite.add(item)
}

function removeItemByName<T extends IImmutableComposite<any>>(composite: ICompositeFixedValue<T>, name: string) {
  return composite.remove(name)
}

function removeAllItems<T extends IImmutableComposite<any>>(composite: ICompositeFixedValue<T>) {
  getAllItems(composite)
    .map(item => item.name)
    .forEach(name => removeItemByName(composite, name))
}

export {
  getItemByName,
  getAllItems,
  addItem,
  removeItemByName,
  removeAllItems,
}