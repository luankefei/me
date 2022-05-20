/* eslint-disable no-restricted-globals */
import { useEffect } from 'react'
import { getDayList } from '../../utils/date'

/* eslint-disable-next-line @typescript-eslint/naming-convention */
declare let $: any

const CALENDAR_HEADER_HEIGHT = 50
const DEFAULT_BORDER_COLOR = '#dcdee0'
const DEFAULT_BOX_WIDTH = 1400

// 所有格子高度 包含课表栏
// 270 * 6
const DEFAULT_BOX_HEIGHT = 1620
const CALENDAR_MAIN_HEIGHT = DEFAULT_BOX_HEIGHT - CALENDAR_HEADER_HEIGHT
const DATE_BOX_HEIGHT = 30 // 日期栏高度
const SCHEDULE_BOX_HEIGHT = 100 // 课表栏高度
const COL_LIMIT = 7 // 每周7天
const ROW_LIMIT = 6 // 每月最多6周

// start x & start y
const createBoxLine = (x, y, w?, h?) => {
  const width = w || DEFAULT_BOX_WIDTH
  const height = h || DEFAULT_BOX_HEIGHT
  const color = DEFAULT_BORDER_COLOR
  // const padding = DEFAULT_PADDING

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

const initCanvas = (id: string, width: number, height: number) => {
  const node = document.getElementById(id) as HTMLCanvasElement

  const w = width || screen.availWidth || screen.width
  const h = height || screen.availHeight || screen.height
  const dpr = window.devicePixelRatio

  node.style.width = `${w}px`
  node.style.height = `${h}px`
  node.width = w * dpr
  node.height = h * dpr

  const { context }: { context: CanvasRenderingContext2D } = new $.Flowings(id)
  const layerHelper = new $.LayerHelper()

  return {
    context,
    layerHelper
  }
}

// 生成横竖 6 * 7 的绘图数据
const generateCalendarLines = (
  x: number,
  y: number,
  w: number,
  h: number,
  col: number,
  row: number
) => {
  const lines = []

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
function generateCalendarRowTexts(
  x: number,
  y: number,
  w: number,
  h: number,
  col: number,
  contents: string[],
  lineHeight?: number
) {
  const texts = []
  for (let i = 0; i < col; i++) {
    texts.push({
      y,
      color: '#3c4043',
      x: (DEFAULT_BOX_WIDTH / col) * i,
      line_height: lineHeight || CALENDAR_HEADER_HEIGHT,
      align: 'center',
      limit: DEFAULT_BOX_WIDTH / col,
      content: contents[i] || '',
      size: 13
    })
  }

  return texts
}

// 将日历数组按行（周）切割
const sliceDayList = (list: any[] = []) => {
  const loopCount = Math.ceil(list.length / COL_LIMIT)
  let newlist = list
  for (let i = 0; i < loopCount; i += 1) {
    newlist.push(newlist.slice(i * COL_LIMIT, i * COL_LIMIT + COL_LIMIT))
  }

  newlist = newlist.slice(newlist.length - loopCount)
  return newlist
}

/**
 *  标记日期是否在当月内
    先找到第一个1  第一个1前边都不是这个月
    然后再找第二个1 是否存在 一个简单的方法 从第1个1 直接加27 然后向后遍历到结束 这样可以避免判断闰年

    如果知道是否闰年 和具体月份，可以直接看最后一位是否当月最后一天。如果不是向前遍历找到第二个1
 */
const markupDates = (dates) => {
  const monthStartIndex = dates.findIndex((item) => item.content === '1')
  let monthEndIndex = dates.findIndex(
    (item, index) => item.content === '1' && index > 27
  )

  // 进行一次纠正
  if (monthEndIndex === -1) monthEndIndex = Infinity

  return dates.map((item, index) => {
    const outState = index < monthStartIndex || index >= monthEndIndex

    // console.log('outState', outState, monthStartIndex, monthEndIndex)
    return {
      ...item,
      color: outState ? '#ccc' : item.color
    }
  })
}

// 生成课表文字
const generateScheduleTexts = () => {
  const content =
    '3.09@6:42/km HR avg 161\n5.88km@5:50/km\n \n早上3km轻松跑，中午尝试跑马拉松配速，但比较疲劳'

  return generateCalendarRowTexts(
    0,
    DATE_BOX_HEIGHT,
    DEFAULT_BOX_WIDTH,
    SCHEDULE_BOX_HEIGHT,
    COL_LIMIT,
    ['', '', '', '', '', '', content],
    20
  )
}

// 生成饮食文字，相对课表文字偏移一个课表栏的高度
const generateDietTexts = () => {
  const content =
    '早餐8:00 / 水爆蛋 / 酸牛奶 / 蒸蛋\n加餐 坚果 / 咖啡\n午餐12:30 酱牛肉 / 洋葱胡萝卜炒鸡腿肉 / 蘑菇炒鸡腿肉 / 烤鱼\n晚餐 4:30 同上'
  return generateCalendarRowTexts(
    0,
    DATE_BOX_HEIGHT + SCHEDULE_BOX_HEIGHT,
    DEFAULT_BOX_WIDTH,
    SCHEDULE_BOX_HEIGHT,
    COL_LIMIT,
    ['', '', '', '', '', '', content],
    20
  )
}

const Calendar = () => {
  useEffect(() => {
    // step 1: 初始化画布

    const { context: ctx, layerHelper } = initCanvas(
      'running-canvas',
      screen.availWidth,
      1200
    )

    // step 2: 绘制表头、边框、日历表格、日期
    const headerContents = ['一', '二', '三', '四', '五', '六', '日']
    const borders = createBoxLine(0, 0)
    const headers = generateCalendarRowTexts(
      0,
      0,
      DEFAULT_BOX_WIDTH,
      CALENDAR_HEADER_HEIGHT,
      COL_LIMIT,
      headerContents
    )
    const grids = generateCalendarLines(
      0,
      0,
      DEFAULT_BOX_WIDTH,
      CALENDAR_MAIN_HEIGHT,
      COL_LIMIT,
      ROW_LIMIT
    )
    const dateGrids = new Array(ROW_LIMIT)
      .fill(null)
      .map((_, i) =>
        generateCalendarLines(
          0,
          DATE_BOX_HEIGHT + (CALENDAR_MAIN_HEIGHT / ROW_LIMIT) * i,
          DEFAULT_BOX_WIDTH,
          SCHEDULE_BOX_HEIGHT,
          1,
          1
        )
      )
    const scheduleGrids = new Array(ROW_LIMIT)
      .fill(null)
      .map((_, i) =>
        generateCalendarLines(
          0,
          DATE_BOX_HEIGHT +
            (CALENDAR_MAIN_HEIGHT / ROW_LIMIT) * i +
            SCHEDULE_BOX_HEIGHT,
          DEFAULT_BOX_WIDTH,
          DATE_BOX_HEIGHT,
          1,
          1
        )
      )

    layerHelper.layers.lines = borders
    layerHelper.layers.texts = headers
    layerHelper.render(ctx)

    // 向下平移，预留出表头的位置
    ctx.save()
    ctx.translate(0, 50)

    const d = new Date()

    const monthDayList = sliceDayList(getDayList(d.getFullYear(), d.getMonth()))
    let dates = monthDayList.map((w, i) =>
      generateCalendarRowTexts(
        0,
        Math.floor(CALENDAR_MAIN_HEIGHT / ROW_LIMIT) * i,
        DEFAULT_BOX_WIDTH,
        DATE_BOX_HEIGHT,
        COL_LIMIT,
        w.map((item) => item.day.toString()),
        DATE_BOX_HEIGHT
      )
    )

    // 这里要对文字进行标记
    dates = markupDates(dates.flat(2))

    // 渲染课表
    const schedules = generateScheduleTexts()

    // 渲染饮食记录
    const diet = generateDietTexts()

    layerHelper.layers.lines = [
      ...grids,
      ...scheduleGrids.flat(Infinity),
      ...dateGrids.flat(Infinity)
    ]
    layerHelper.layers.texts = [...dates, ...schedules, ...diet]
    layerHelper.render(ctx)
  }, [])

  return (
    <div>
      <canvas id="running-canvas" />
    </div>
  )
}

export default Calendar
