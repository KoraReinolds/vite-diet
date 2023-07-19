import type { IImmutable } from "./IImmutable";

interface IMutable<T> extends IImmutable<T> {
  set(value: T): void;
}

export type { IMutable }