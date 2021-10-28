import { useEffect } from 'react'

/* eslint-disable-next-line @typescript-eslint/naming-convention */
declare let $: any

// const DEFAULT_PADDING = 50
const DEFAULT_BORDER_COLOR = '#dcdee0'
const DEFAULT_BOX_WIDTH = 1400
const DEFAULT_BOX_HEIGHT = 850

// start x & start y
const createBoxLine = (x, y, w?, h?) => {
  const width = w || DEFAULT_BOX_WIDTH
  const height = h || DEFAULT_BOX_HEIGHT
  // const padding = DEFAULT_PADDING
  const color = DEFAULT_BORDER_COLOR

  return [
    {
      color,
      x1: x,
      x2: width,
      y1: y,
      y2: y,
      line_width: 1
    },
    {
      color,
      x1: 0,
      x2: 0,
      y1: 0,
      y2: height,
      line_width: 1
    },
    {
      color,
      x1: 0,
      x2: width,
      y1: height,
      y2: height,
      line_width: 1
    },
    {
      color,
      x1: width,
      x2: width,
      y1: 0,
      y2: height,
      line_width: 1
    }
  ]
}

const initCanvas = () => {
  const { context } = new $.Flowings()
  const layerHelper = new $.LayerHelper()

  return {
    context,
    layerHelper
  }
}

// 生成横竖 5 * 7 的绘图数据
const generateCalendarLines = () => {
  const lines = []
  const rowLimit = 5
  const colLimit = 7
  const width = DEFAULT_BOX_WIDTH
  const height = DEFAULT_BOX_HEIGHT

  // cols
  for (let i = 0; i < colLimit; i++) {
    lines.push({
      color: DEFAULT_BORDER_COLOR,
      x1: width - (width / colLimit) * i,
      x2: width - (width / colLimit) * i,
      y1: 0,
      y2: DEFAULT_BOX_HEIGHT,
      line_width: 1
    })
  }

  // rows
  for (let i = 0; i < rowLimit; i++) {
    lines.push({
      color: DEFAULT_BORDER_COLOR,
      x1: 0,
      x2: width,
      y1: height - (height / rowLimit) * i,
      y2: height - (height / rowLimit) * i,
      line_width: 1
    })
  }

  return lines
}

const Calendar = () => {
  useEffect(() => {
    // step 1: 初始化画布
    const { context, layerHelper } = initCanvas()

    // step 2: 绘制日历网格
    layerHelper.layers = {
      lines: createBoxLine(0, 0).concat(generateCalendarLines())
    }

    layerHelper.render(context)
  }, [])

  return (
    <div>
      <canvas />
    </div>
  )
}

export default Calendar
