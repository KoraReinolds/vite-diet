import { type MN } from "@/interfaces/IMacroNutrientValues";

abstract class MacroNutrient {
  abstract _energyPerGram: number
  abstract _type: MN;
}

class Fats implements MacroNutrient {
  _energyPerGram: number = 9.3;
  _type: MN = 'fats';
}

class Proteins implements MacroNutrient {
  _energyPerGram: number = 4.2;
  _type: MN = 'proteins';
}


class Carbohydrates implements MacroNutrient {
  _energyPerGram: number = 4.2;
  _type: MN = 'carbohydrates';
}

export { Fats, Proteins, Carbohydrates }