import { useEffect } from 'react'
import Head from 'next/head'
import { Container, Summary } from './running.style'

/* eslint-disable-next-line @typescript-eslint/naming-convention */
declare let _: any

const Running = () => {
  const initCanvas = () => {
    const { canvas, context } = new _.Flowings()
    const layerHelper = new _.LayerHelper()

    layerHelper.layers = {
      images: [
        {
          image_url:
            'https://img.laiye.com/cLvgXicdq4RMvFgMeyiarFciatqCEPrkGudP9N6SceHhmA4Tl2unDvK4rNVCFroJZcfqMnUGvnBeDLaZpDYW0TRl9lxmD47gs70.jpg',
          x: 48,
          y: 48,
          width: 150,
          height: 150,
          border_radius: 25,
          resize: true,
          rotate: 45
        },
        {
          x: 0,
          width: 750,
          height: 750,
          image_url:
            'https://img.laiye.com/checkinAlbum_20200316083737_htqvLACrln.jpg',
          z: 1,
          opacity: 0.5
        }
      ],
      texts: [
        {
          x: 6,
          z: 2,
          content: '我爱北京天安门'
        }
      ]
    }

    layerHelper.load().then(() => layerHelper.render(context))
    // layerHelper.prepareToRender();
    console.log('canvas', canvas)
  }

  const renderArticle = (contents) =>
    contents.map((item, index) => {
      if (item.type === 'image') {
        return (
          <img
            className="article-image"
            style={{ width: item.width || '100%' }}
            src={item.url}
            alt=""
            key={index}
          />
        )
      }

      return (
        <div className={`article-${item.type}`} key={index}>
          {item.parse ? (
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          ) : (
            item.content
              .split('\n')
              .map((str, idx) => <div key={idx}>{str}</div>)
          )}
        </div>
      )
    })

  const renderSummary = () => {
    const contents = [
      {
        type: 'content',
        content:
          '训练分为四个阶段：Transiton、Base、Fundamental、Marathon-Specific。'
      },
      {
        type: 'content',
        content: '此训练计划共20周，第一次使用后可能视情况调整到24周'
      },
      {
        type: 'list',
        content:
          'Transition 3w 以不超过60min的easy run为主，训练后可增加6-10组 10s 短上坡冲刺（练腿部力量和核心力量的黄金时间\nBase 4w 以easy run为主，逐渐增加跑量。加入30s - 2min 的 Fartlek 质量跑。长距离跑以 60-120min 为主，训练结束后可增加长上坡训练\nFundamental 8w 加入乳酸阈值跑，LSD 和间歇。在周中加入速度课后紧跟着第二天的长距离跑\nMarathon-Specific 5w 马拉松配速节奏跑，LSD'
      },
      {
        type: 'content',
        content:
          '用当前全马能力对应的配速区间训练，乳酸阈值跑参考 10k - half，间歇参考 5km\n深黄色对应马拉松专项训练，蓝色对应强度训练，绿色填充轻松跑'
      },
      {
        type: 'unordered-list',
        content:
          'E - easy running\nM - Marathon-pace running\nT - Threshould running\nI - Interval training\nR Repetition training\nL - Long distance'
      }
    ]

    return renderArticle(contents)
  }

  useEffect(() => {
    initCanvas()
  }, [])

  return (
    <div>
      <Head>
        <title>跑步 - Sunken.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Summary>{renderSummary()}</Summary>
        <div>bottom, calendar layout section</div>
      </Container>
    </div>
  )
}

export default Running
