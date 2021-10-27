import { useEffect } from 'react'

/* eslint-disable-next-line @typescript-eslint/naming-convention */
declare let _: any

const DEFAULT_PADDING = 50
const DEFAULT_BORDER_COLOR = '#dcdee0'
const DEFAULT_BOX_WIDTH = 1400
const DEFAULT_BOX_HEIGHT = 850

// start x & start y
const createBoxLine = (x, y, w?, h?) => {
  const width = w || DEFAULT_BOX_WIDTH
  const height = h || DEFAULT_BOX_HEIGHT
  const padding = DEFAULT_PADDING
  const color = DEFAULT_BORDER_COLOR

  return [
    {
      color,
      x1: padding + x,
      x2: width - padding,
      y1: padding + y,
      y2: padding + y,
      line_width: 1
    },
    {
      color,
      x1: padding,
      x2: padding,
      y1: padding,
      y2: height - padding,
      line_width: 1
    },
    {
      color,
      x1: padding,
      x2: width - padding,
      y1: height - padding,
      y2: height - padding,
      line_width: 1
    },
    {
      color,
      x1: width - padding,
      x2: width - padding,
      y1: padding,
      y2: height - padding,
      line_width: 1
    }
  ]
}

const initCanvas = () => {
  const { canvas, context } = new _.Flowings()
  const layerHelper = new _.LayerHelper()

  // color	string	线条的颜色，同 text
  // x1	float64	线条起点
  // y1	float64	线条起点
  // x2	float64	线条终点
  // y2	float64	线条终点
  // line_width	float64	笔画粗度
  // dashed

  layerHelper.layers = {
    // images: [
    //   {
    //     image_url:
    //       'https://img.laiye.com/cLvgXicdq4RMvFgMeyiarFciatqCEPrkGudP9N6SceHhmA4Tl2unDvK4rNVCFroJZcfqMnUGvnBeDLaZpDYW0TRl9lxmD47gs70.jpg',
    //     x: 48,
    //     y: 48,
    //     width: 150,
    //     height: 150,
    //     border_radius: 25,
    //     resize: true,
    //     rotate: 45
    //   },
    //   {
    //     x: 0,
    //     width: 750,
    //     height: 750,
    //     image_url:
    //       'https://img.laiye.com/checkinAlbum_20200316083737_htqvLACrln.jpg',
    //     z: 1,
    //     opacity: 0.5
    //   }
    // ],
    // texts: [
    //   {
    //     x: 6,
    //     z: 2,
    //     content: '我爱北京天安门'
    //   }
    // ],
    lines: createBoxLine(0, 0)
  }

  console.log(canvas)
  return layerHelper.load().then(() => layerHelper.render(context))

  // layerHelper.prepareToRender();
}

// 生成横竖 5 * 7 的绘图数据
const generateCalendarLines = () => {
  const lines = []
  const rowLimit = 5
  // const colLimit = 7

  for (let i = 0; i < rowLimit; i++) {
    lines.push({
      color: DEFAULT_BORDER_COLOR,
      x1: 0,
      x2: DEFAULT_BOX_WIDTH - (DEFAULT_BOX_WIDTH / rowLimit) * i,
      y1: 0,
      y2: DEFAULT_BOX_HEIGHT,
      line_width: 1
    })
  }

  // for (let j = 0; j < colLimit; j++) {}
  return lines
}

const Calendar = () => {
  useEffect(() => {
    // step 1: 初始化画布
    const layerHelper = initCanvas()

    // step 2: 将画布分割
    const lines = generateCalendarLines()
    console.log(layerHelper, lines)
    // layerHelper.render(lines)
  }, [])

  return (
    <div>
      <canvas />
    </div>
  )
}

export default Calendar
