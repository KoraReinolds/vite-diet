import { useReactive } from "@/composables/useReactive"
import { getPFCRatio, setPFCRatio } from "@/layerClasses.ts/pfcRatio"

const pfcRatio = useReactive(
  getPFCRatio,
  setPFCRatio
)

export {
  pfcRatio,
}
