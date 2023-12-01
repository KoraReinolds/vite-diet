import type { IImmutableComposite } from "@/interfaces/IComposite";

function getItemByName<T extends IImmutableComposite<any>>(composite: IImmutableComposite<T>, name: string) {
  return composite.get(name)
}

export {
  getItemByName,
}