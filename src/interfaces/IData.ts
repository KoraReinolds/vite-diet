interface IProductData {
  name: string,
  kcal: string,
  proteins: string,
  fats: string,
  carbohydrates: string,
  chunks: string,
}

interface IMealEditableData {
  name: string,
  portions: number,
  min: number,
  max: number,
}

interface INewFoodData {
  name: string,
  proteins: number,
  fats: number,
  carbohydrates: number,
  chunkSize: number,
}

interface IMealData {
  proteins: number
  carbohydrates: number
  fats: number
  energy: number
  name: string 
}

export type { IMealData, IProductData, IMealEditableData, INewFoodData }