import { Food } from "@/classes/Food";
import type { IFoodParams } from "@/interfaces/IFoodParams";

const poridge = new Food({ name: 'Овсянка', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'Молоко', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'Миндаль', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'Клубника', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'Вишня', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'Яйцо', chunkSize: 60, chunks: 2, fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'Рис', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const chicken = new Food({ name: 'Курица', fats: 0.5, carbohydrates: 0.5, proteins: 20 })
const carrot = new Food({ name: 'Морковь', proteins: 0.9, fats: 0.2, carbohydrates: 6.8 })
const sunflowerOil = new Food({ name: 'Подсолнечное масло', proteins: 0, fats: 99.9, carbohydrates: 0 })
const onion = new Food({ name: 'Лук', proteins: 1.1, fats: 0.1, carbohydrates: 9 })
const greanBeans = new Food({ name: 'Стручковая фасоль', proteins: 4, fats: 0, carbohydrates: 4.3 })
const cauliflower = new Food({ name: 'Цветная капуста', proteins: 2.5, fats: 0, carbohydrates: 5 })
const broccoli = new Food({ name: 'Брокколи', proteins: 3, fats: 0.4, carbohydrates: 5.2 })
const pepper = new Food({ name: 'Перец', proteins: 1.3, fats: 0.1, carbohydrates: 5.3 })

function createFood(params: IFoodParams) {
  return new Food(params)
}

export default {
  createFood,
  all: [
    poridge,
    milk,
    nuts,
    strawberry,
    cherry,
    egg,
    rice,
    chicken,
    carrot,
    sunflowerOil,
    onion,
    greanBeans,
    cauliflower,
    broccoli,
    pepper,
  ],
}