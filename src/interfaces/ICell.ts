interface ICell {
  type: string
  editable: boolean
}

interface IStringCell extends ICell {
  value: string
}

interface INumberCell extends ICell {
  value: number
  precise: number
}

interface IIconCell extends ICell {
  value: any  
  onClick: Function
}

type Cell = IStringCell | INumberCell | IIconCell

export type { Cell, IStringCell, INumberCell, IIconCell }