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

interface IPer100Chunks {
  getEnergyPer100(): number
  proteinsChunkPer100: number
  fatsChunkPer100: number
  carbohydratesChunkPer100: number
}

export type { IPer100Chunks, IChunks, IChunksParams }