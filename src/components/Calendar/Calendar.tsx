import { useEffect } from 'react'

/* eslint-disable-next-line @typescript-eslint/naming-convention */
declare let _: any

// start x & start y
const createBoxLine = (x, y, w?, h?) => {
  // {
  //   color: 'blue',
  //   x1: 10,
  //   x2: 200,
  //   y1: 10,
  //   y2: 10,
  //   line_width: 1
  // }
  const width = w || window.screen.width
  const height = h || window.screen.height
  const padding = 50
  const color = '#dcdee0'

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

  layerHelper.load().then(() => layerHelper.render(context))
  // layerHelper.prepareToRender();
  console.log('canvas', canvas)
}

const Calendar = () => {
  useEffect(() => {
    initCanvas()
  }, [])

  return (
    <div>
      <canvas />
    </div>
  )
}

export default Calendar
