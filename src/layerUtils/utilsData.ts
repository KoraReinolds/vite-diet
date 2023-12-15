import type { IFoodData } from "@/interfaces/IFoodData"
import type { IFoodParams } from "@/interfaces/IFoodParams"
import type { IHasName } from "@/interfaces/IHasName"
import type { IMealEditableData, INewFoodData, IProductData } from "@/interfaces/IData"

function isProductData(data: IProductData): data is IProductData {
  return typeof data === 'object'
    && data.name !== undefined
    && data.proteins !== undefined
    && data.fats !== undefined
    && data.carbohydrates !== undefined
    && data.chunks !== undefined
    && data.chunkSize !== undefined
}

function isListOfProductData(data: IProductData[]): data is IProductData[] {
  return Array.isArray(data)
    && data.every((item) => isProductData(item))
}

function getProductData(data: IFoodData): IProductData {
  return {
    name: data.name, 
    kcal: data.kcal100,
    proteins: data.proteins100,        
    fats: data.fats100,
    carbohydrates: data.carbohydrates100,
    chunks: data.chunks,
    chunkSize: data.chunkSize,
  }
}

function getFoodParamsFromProductData(data: IProductData): IFoodParams {
  return {
    name: data.name,
    proteins: +data.proteins,
    fats: +data.fats,
    carbohydrates: +data.carbohydrates,
    chunks: +data.chunks,
    chunkSize: +data.chunkSize,
  }
}

function getNewFoodDataFromFoodData(data: IFoodData | undefined): INewFoodData | undefined {
  if (!data) return undefined
  return {
    name: data.name,
    proteins: +data.proteins100,
    fats: +data.fats100,
    carbohydrates: +data.carbohydrates100,
    chunkSize: +data.chunkSize,
  }
}

function getEditableData(data: IFoodData): IMealEditableData {
  return {
    name: data.name, 
    portions: +data.chunks,
    min: 0,
    max: 0,
  }
}

function getItemByName<T extends IHasName>(list: T[], name: string): T | undefined {
  return list.filter(
    item => item.name === name
  )[0]
}

type TransformFunction<T, U> = (arg: T) => U;

function listToData<T, U>(list: U[], transformFunction: TransformFunction<U, T>): T[] {
  return list.map(transformFunction);
}

export default {
  listToData,
  getItemByName,
  getNewFoodDataFromFoodData,
  getFoodParamsFromProductData,
  getProductData,
  getEditableData,
  isListOfProductData,
}