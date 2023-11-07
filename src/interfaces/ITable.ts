interface IProductRow {
  name: string,
  kcal: string,
  proteins: string,
  fats: string,
  carbohydrates: string,
}

interface IMealRow {
  name: string,
  portions: number,
  min: number,
  max: number,
}

export type { IProductRow, IMealRow }