import type { IImutable } from "./IImmutable";

interface IMutable<T> extends IImutable<T> {
  set(value: T): void;
}

export type { IMutable }