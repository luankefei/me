import { useEffect } from 'react'

/* eslint-disable-next-line @typescript-eslint/naming-convention */
declare let $: any

const CALENDAR_HEADER_HEIGHT = 50
const DEFAULT_BORDER_COLOR = '#dcdee0'
const DEFAULT_BOX_WIDTH = 1400
const DEFAULT_BOX_HEIGHT = 900
const CALENDAR_MAIN_HEIGHT = DEFAULT_BOX_HEIGHT - CALENDAR_HEADER_HEIGHT

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
  const { context }: { context: CanvasRenderingContext2D } = new $.Flowings()
  const layerHelper = new $.LayerHelper()

  return {
    context,
    layerHelper
  }
}

// 生成横竖 5 * 7 的绘图数据
const generateCalendarLines = (x: number, y: number, w: number, h: number, col: number, row: number) => {
  console.log('generateCalendarLines', x, y)
  const lines = []
  // const width = DEFAULT_BOX_WIDTH
  // const height = DEFAULT_BOX_HEIGHT - CALENDAR_HEADER_HEIGHT // 预留出表头的位置

  // cols
  for (let i = 0; i < col; i++) {
    lines.push({
      color: DEFAULT_BORDER_COLOR,
      x1: w - (w / col) * i,
      x2: w - (w / col) * i,
      y1: y,
      y2: h,
      line_width: 1
    })
  }

  // rows
  for (let i = 0; i < row; i++) {
    lines.push({
      color: DEFAULT_BORDER_COLOR,
      x1: x,
      x2: w,
      y1: (h / row) * i + y,
      y2: (h / row) * i + y,
      line_width: 1
    })
  }

  return lines
}

// 生成一行7列的文字
function generateCalendarRowTexts(x: number, y: number, w: number, h: number, col: number, contents: string[]) {
  const texts = []
  for (let i = 0; i < col; i++) {
    texts.push({
      color: '#3c4043',
      x: (DEFAULT_BOX_WIDTH / col) * i,
      y: 0,
      line_height: CALENDAR_HEADER_HEIGHT,
      align: 'center',
      limit: DEFAULT_BOX_WIDTH / col,
      content: contents[i] || '',
      size: 16
    })
  }

  return texts
}

const Calendar = () => {
  useEffect(() => {
    // step 1: 初始化画布
    const { context: ctx, layerHelper } = initCanvas()

    // step 2: 绘制表头、边框、日历表格、日期
    const headerContents = ['一', '二', '三', '四', '五', '六', '日']
    const borders = createBoxLine(0, 0)
    const headers = generateCalendarRowTexts(0, 0, DEFAULT_BOX_WIDTH, CALENDAR_HEADER_HEIGHT, 7, headerContents)
    const grids = generateCalendarLines(0, 0, DEFAULT_BOX_WIDTH, CALENDAR_MAIN_HEIGHT, 7, 5)
    const scheduleGrids = new Array(5)
      .fill(null)
      .map((_, i) => generateCalendarLines(0, (CALENDAR_MAIN_HEIGHT / 5) * i + 50, DEFAULT_BOX_WIDTH, 50, 1, 1))

    layerHelper.layers.lines = borders
    layerHelper.layers.texts = headers
    layerHelper.render(ctx)

    // 向下平移，预留出表头的位置
    ctx.save()
    ctx.translate(0, 50)

    console.log('scheduleGrids', scheduleGrids)
    layerHelper.layers.lines = [...grids, ...scheduleGrids.flat(Infinity)]
    layerHelper.layers.texts = []
    layerHelper.render(ctx)
  }, [])

  return (
    <div>
      <canvas />
    </div>
  )
}

export default Calendar
