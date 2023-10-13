import type { ITimeLine } from "@/interfaces/ITimeLine";
import type { Meal } from "./Meal";
import { CompositeWithFixedValue } from "./Composite";

class TimeLine extends CompositeWithFixedValue<Meal>
implements ITimeLine {
  meals: Meal[] = [];
  addMeal(meal: Meal): void {
    throw new Error("Method not implemented.");
  }
}

export { TimeLine }