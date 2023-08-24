interface IChunksParams {
  chunks: number 
  chunkSize?: number
}

interface IChunks extends Required<IChunksParams> {
  proteinsChunk: number
  fatsChunk: number
  carbohydratesChunk: number
  getEnergyChunk(): number
}

export type { IChunks, IChunksParams }