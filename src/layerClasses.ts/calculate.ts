import { GreedySearch } from "@/classes/GreedySearch";
import { GraphNode } from "@/classes/GraphNode";
import models from "@/layerInstances/models";

function calculate(
  initState: Record<string, number> | undefined,
  maxState: Record<string, number> | undefined
) {
  const gs = new GreedySearch(
    new GraphNode(models.dietPlan, initState, maxState)
  )
  return gs.search(0.01)
}

export {
  calculate,
}