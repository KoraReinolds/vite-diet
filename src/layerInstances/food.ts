import { Food } from "@/classes/Food";
import type { IFoodParams } from "@/interfaces/IFoodParams";

const poridge = new Food({ name: 'овсянка', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'молоко', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'миндаль', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'клубника', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'вищня', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'яйцо', chunkSize: 60, chunks: 2, fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'рис', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const chicken = new Food({ name: 'курица', fats: 0.5, carbohydrates: 0.5, proteins: 20 })
const carrot = new Food({ name: 'морковь', proteins: 0.9, fats: 0.2, carbohydrates: 6.8 })
const sunflowerOil = new Food({ name: 'подсолнечное масло', proteins: 0, fats: 99.9, carbohydrates: 0 })
const onion = new Food({ name: 'лук', proteins: 1.1, fats: 0.1, carbohydrates: 9 })
const greanBeans = new Food({ name: 'стручковая фасоль', proteins: 4, fats: 0, carbohydrates: 4.3 })
const cauliflower = new Food({ name: 'цветная капусто', proteins: 2.5, fats: 0, carbohydrates: 5 })
const broccoli = new Food({ name: 'брокколи', proteins: 3, fats: 0.4, carbohydrates: 5.2 })
const pepper = new Food({ name: 'перец', proteins: 1.3, fats: 0.1, carbohydrates: 5.3 })

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