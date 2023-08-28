import type { PFC } from "./PFC";
import type { IChunksParams } from "./IChunks";
import type { IHasName } from "./IHasName";

interface IFoodParams
extends Partial<IChunksParams>, IHasName, PFC {}

export type { IFoodParams }