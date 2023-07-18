interface IRangeParams {
  min: number
  max: number
}

export class NutritionRange {
  min: number;
  max: number;
  constructor(params: IRangeParams) {
    this.max = params.max;
    this.min = params.min;
  }
}
