import type { IIconCell, INumberCell, IStringCell } from "@/interfaces/ICell"

class StringCell implements IStringCell {
  type = "string"
  value: string
  editable: boolean
  constructor(value: string, editable: boolean | undefined = false) {
    this.value = value
    this.editable = editable
  }
}

class NumberCell implements INumberCell {
  type = "number"
  value: number
  editable: boolean
  precise: number
  constructor(value: number, editable: boolean | undefined = false, precise: number | undefined = 0) {
    this.value = value
    this.editable = editable
    this.precise = precise
  }
}

class IconCell implements IIconCell {
  type = "icon"
  value: any
  editable: boolean = false
  onClick: Function
  constructor(value: any, onClick: Function) {
    this.value = value
    this.onClick = onClick
  }
}

export { StringCell, NumberCell, IconCell }