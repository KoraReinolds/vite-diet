interface IChunksParams {
  chunks: number 
  chunkSize?: number
}

interface IChunks extends Required<IChunksParams> {
  proteinsChunk: number
  fatsChunk: number
  carbohydratesChunk: number
  proteinsChunkPer100: number
  fatsChunkPer100: number
  carbohydratesChunkPer100: number
  getEnergyChunk(): number
  getEnergyPer100(): number
}

export type { IChunks, IChunksParams }