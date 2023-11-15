interface IProductData {
  name: string,
  kcal: string,
  proteins: string,
  fats: string,
  carbohydrates: string,
}

interface IMealEditableData {
  name: string,
  portions: number,
  min: number,
  max: number,
}

interface IMealInfoData {
  name: string,
  chunks: string,
  kcal: string,
  proteins: string,
  fats: string,
  carbohydrates: string,
}

export type { IProductData, IMealEditableData, IMealInfoData }