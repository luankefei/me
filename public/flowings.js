var _ = (function (exports) {
  'use strict'

  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

  var __assign = function () {
    __assign =
      Object.assign ||
      function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }

  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j]
    return r
  }

  /**
   * 对象的扩展
   */
  function deepClone(obj) {
    var isObject = function (o) {
      return (typeof o === 'object' || typeof o === 'function') && o !== null
    }
    if (!isObject(obj)) throw TypeError('param 1 is not object')
    var newObj = Array.isArray(obj) ? __spreadArrays(obj) : __assign({}, obj)
    if (obj instanceof HTMLImageElement) newObj = obj
    Reflect.ownKeys(newObj).forEach(function (key) {
      newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })
    return newObj
  }

  var lib = {
    deepClone: deepClone
  }

  function loadImage(path) {
    return new Promise(function (resolve, reject) {
      var image = new Image()
      image.crossOrigin = 'Anonymous'
      image.onload = function () {
        return resolve(image)
      }
      image.onerror = function (err) {
        return reject(err)
      }
      image.onerror = function (err) {
        var imageNoCross = new Image()
        imageNoCross.onload = function () {
          return resolve(image)
        }
        imageNoCross.onerror = function () {
          return reject(err)
        }
        imageNoCross.src = path
      }
      image.src = path
    })
  }
  // load image & filter catched onerror undefined
  function loadImageList(paths) {
    return Promise.allSettled(
      paths.map(function (path) {
        return loadImage(path)
      })
    )
  }

  var CImage = /** @class */ (function () {
    function CImage(props) {
      var _this = this
      this.x = 0
      this.y = 0
      this.z = 0
      this.width = 0
      this.height = 0
      this.expire = 0
      this.border_radius = 0
      this.name = ''
      this.image_url = ''
      this.resize = true
      this.clip = undefined
      this.buffer = null
      this.rotate = 0
      this.opacity = 1
      Object.keys(props).forEach(function (key) {
        return (_this[key] = props[key])
      })
    }
    CImage.prototype.draw = function (ctx) {
      if (this.buffer === null) {
        throw new Error('image ' + this.image_url + ' was not loaded')
      }
      ctx.save()
      // 设置全局透明度
      ctx.globalAlpha = this.opacity
      var startX = 0
      var startY = 0
      var imageWidth = this.buffer.width
      var imageHeight = this.buffer.height
      // 画布旋转，画布旋转后坐标需重新计算
      if (this.rotate) {
        ctx.beginPath()
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
        ctx.rotate((this.rotate * Math.PI) / 180)
        this.x = -this.width / 2
        this.y = -this.height / 2
      }
      // 圆角
      if (this.border_radius) {
        this.clipRound(
          ctx,
          this.width,
          this.height,
          this.x,
          this.y,
          this.border_radius
        )
      }
      // 图片裁剪
      if (this.clip) {
        startX = this.clip.x
        startY = this.clip.y
        imageWidth = imageWidth - (this.buffer.width - this.clip.width)
        imageHeight = imageHeight - (this.buffer.height - this.clip.height)
      }
      // 最好能把加载流程和绘图流程分割开
      ctx.drawImage(
        this.buffer,
        startX,
        startY,
        imageWidth,
        imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
      ctx.restore()
    }
    CImage.prototype.clipRound = function (ctx, width, height, x, y, radius) {
      var r = typeof radius === 'number' ? radius : undefined
      ctx.beginPath()
      ctx.moveTo(x + (r || radius[1]), y)
      // 右上 -> 右下 -> 左下 -> 左上
      ctx.arcTo(x + width, y, x + width, y + height, r || radius[1])
      ctx.arcTo(x + width, y + height, x, y + height, r || radius[2])
      ctx.arcTo(x, y + height, x, y, r || radius[3])
      ctx.arcTo(x, y, x + width, y, r || radius[0])
      ctx.closePath()
      ctx.clip()
    }
    return CImage
  })()

  /**
   * 文字绘制
   */
  var CText = /** @class */ (function () {
    function CText(props) {
      var _this = this
      this.x = 0
      this.y = 0
      this.z = 0
      this.size = 0
      this.line_height = 0
      this.font_style = 0
      this.align = 0
      this.limit = 0
      this.color = ''
      this.font_family = ''
      this.content = ''
      Object.keys(props).forEach(function (key) {
        return (_this[key] = props[key])
      })
    }
    CText.prototype.draw = function (ctx) {
      console.log('draw text', this.content)
      ctx.fillText(this.content, this.x, this.y)
    }
    return CText
  })()
  // const withText = <T extends Constructor<IText>>(Base: T) =>
  //   class extends Base {
  //     constructor(...props) {
  //       super(props);
  //       Object.keys(props).forEach((key) => (this[key] = props[key]));
  //       console.log('text constructor', props);
  //     }
  //     draw(ctx: CanvasRenderingContext2D) {
  //       console.log('draw text');
  //       ctx.fillText(this.content, this.x, this.y);
  //     }
  //   };

  /**
   * 线条绘制
   */
  var CLine = /** @class */ (function () {
    function CLine(props) {
      var _this = this
      this.z = 0
      this.x1 = 0
      this.y1 = 0
      this.x2 = 0
      this.y2 = 0
      this.line_width = 0
      this.color = 'transparent'
      this.dashed = false
      Object.keys(props).forEach(function (key) {
        return (_this[key] = props[key])
      })
    }
    CLine.prototype.draw = function (ctx) {
      ctx.beginPath()
      ctx.lineWidth = this.line_width
      ctx.strokeStyle = this.color
      ctx.moveTo(this.x1, this.y1)
      ctx.lineTo(this.x2, this.y2)
      ctx.stroke()
      // console.log("draw text", this.content);
      // ctx.fillText(this.content, this.x, this.y);
    }
    return CLine
  })()

  /**
   *  layper.helper
   *
   *  用于多绘图元素的图层合并
   */
  var LayerHelper = /** @class */ (function () {
    function LayerHelper() {
      this.layers = {}
      this.renderQueue = []
      this.sortedState = false
      this.locked = true
      // 只允许修改 layers
      return new Proxy(this, {
        get: function (target, name) {
          var privates = ['locked']
          if (privates.includes(name.toString())) return undefined
          return Reflect.get(target, name)
        },
        set: function (target, name, value) {
          var setable = ['layers', 'locked', 'sortedState']
          if (!setable.includes(name.toString()) && target.locked) {
            throw new TypeError(
              'cannot set the ' + name.toString() + ' property'
            )
          }
          target[name] = value
          return true
        }
      })
    }
    // 加载所有静态资源
    LayerHelper.prototype.load = function () {
      var _this = this
      if (!this.layers.images || this.layers.images.length === 0) {
        return Promise.resolve([])
      }
      var paths = this.layers.images
        .map(function (item) {
          return item.image_url
        })
        .filter(function (item) {
          return item
        })
      return loadImageList(paths).then(function (res) {
        res.forEach(function (item, index) {
          if (item.status === 'fulfilled' && _this.layers.images) {
            _this.layers.images[index].buffer = item.value
          }
        })
        return Promise.resolve(res)
      })
    }
    // 根据z轴排序，其他元素位置保持不变
    LayerHelper.prototype.sort = function () {
      var array = this.renderQueue.slice(0)
      array.sort(function (a, b) {
        a.z = a.z || 0
        b.z = b.z || 0
        if (a.z > b.z) return -1
        if (a.z < b.z) return 1
        return 0
      })
      this.renderQueue = array
    }
    LayerHelper.prototype.prepareToRender = function () {
      // 解锁
      this.locked = false
      // 根据类型进行实例化
      var instancedLayers = lib.deepClone(this.layers)
      if (instancedLayers.images) {
        instancedLayers.images = instancedLayers.images.map(function (item) {
          return new CImage(item)
        })
      }
      if (instancedLayers.texts) {
        instancedLayers.texts = instancedLayers.texts.map(function (item) {
          return new CText(item)
        })
      }
      if (instancedLayers.lines) {
        instancedLayers.lines = instancedLayers.lines.map(function (item) {
          return new CLine(item)
        })
      }
      // 从layer生成渲染队列, 默认先画图片，其次矩形 > 线条 > 文字
      if (!this.renderQueue.length && Object.keys(this.layers).length) {
        var queue = ['images', 'rects', 'lines', 'texts']
        this.renderQueue = queue.reduce(function (prev, key) {
          return prev.concat(instancedLayers[key] || [])
        }, [])
      }
      // 对渲染队列进行排序
      if (!this.sortedState && this.renderQueue.length) {
        this.sortedState = true
        this.sort()
      }
      // 人性的枷锁
      this.locked = true
    }
    // 执行渲染，清空渲染队列
    LayerHelper.prototype.render = function (ctx) {
      // before render
      this.prepareToRender()
      // 根据 task 的类型进行渲染
      // TODO: 现在的渲染是阻塞式的，动画可能需要调整
      for (var _i = 0, _a = this.renderQueue; _i < _a.length; _i++) {
        var task = _a[_i]
        task.draw(ctx)
      }
      // 清空渲染队列
      this.locked = false
      this.renderQueue = []
      this.locked = true
    }
    return LayerHelper
  })()

  /**
   * canvas
   *
   * 图层合并业务的入口文件
   * 因为原来的项目叫做 laiye-canvas 和 golang-canvas 所以这里承接了历史包袱
   */
  // createImage: 对外暴露的合并图层API
  function createImage(basic, params) {
    console.log('basic', basic)
    console.log('params', params)
    // 这里打算做成 layerHelper 的语法糖
    var helper = new LayerHelper()
    helper.layers = params
    // 注入 context
    // helper.render();
    // 使用 canvas 导出图片
  }

  var ImagePainter = /** @class */ (function () {
    function ImagePainter(image) {
      this.image = image
    }
    ImagePainter.prototype.paint = function (sprite, context) {
      context.drawImage(
        this.image,
        sprite.left,
        sprite.top,
        sprite.width,
        sprite.height
      )
    }
    return ImagePainter
  })()
  var SpriteSheetPainter = /** @class */ (function () {
    function SpriteSheetPainter(cells, spriteSheet) {
      this.cellIndex = 0
      this.cells = cells
      this.spriteSheet = spriteSheet
    }
    SpriteSheetPainter.prototype.advance = function () {
      // loop
      if (this.cellIndex === this.cells.length - 1) {
        this.cellIndex = 0
      } else {
        this.cellIndex += 1
      }
    }
    SpriteSheetPainter.prototype.paint = function (sprite, context) {
      var cell = this.cells[this.cellIndex]
      context.drawImage(
        this.spriteSheet,
        cell.x,
        cell.y,
        cell.width,
        cell.height,
        sprite.left,
        sprite.top,
        cell.width,
        cell.height
      )
    }
    return SpriteSheetPainter
  })()
  var BallPainter = /** @class */ (function () {
    function BallPainter(radius) {
      this.radius = radius
    }
    BallPainter.prototype.paint = function (sprite, context) {
      context.beginPath()
      context.arc(
        sprite.left + sprite.width / 2,
        sprite.top + sprite.height / 2,
        this.radius,
        0,
        Math.PI * 2,
        false
      )
      context.clip()
      context.shadowColor = 'rgb(0,0,0)'
      context.shadowOffsetX = -4
      context.shadowOffsetY = -4
      context.shadowBlur = 8
      context.lineWidth = 2
      context.strokeStyle = 'rgb(100,100,195)'
      context.fillStyle = 'rgba(30, 144,255,0.15)'
      context.fill()
      context.stroke()
    }
    return BallPainter
  })()

  var painter = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    ImagePainter: ImagePainter,
    SpriteSheetPainter: SpriteSheetPainter,
    BallPainter: BallPainter
  })

  /**
   *
   */
  var Sprite = /** @class */ (function () {
    function Sprite(name, painter, behaviors) {
      if (painter !== undefined) this.painter = painter
      this.top = 0
      this.left = 0
      this.width = 10
      this.height = 10
      this.velocityX = 0
      this.velocityY = 0
      this.name = name
      this.visible = true
      this.animating = false
      this.behaviors = behaviors || []
      return this
    }
    Sprite.prototype.paint = function (context) {
      if (this.painter !== undefined && this.visible) {
        this.painter.paint(this, context)
      }
    }
    Sprite.prototype.update = function (context, time) {
      for (var _i = 0, _a = this.behaviors; _i < _a.length; _i++) {
        var b = _a[_i]
        b.execute(this, context, time)
      }
    }
    return Sprite
  })()

  var runInPlace = {
    lastAdvance: 0,
    PAGEFLIP_INTERVAL: 100,
    execute: function (sprite, _, time) {
      if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
        sprite.painter.advance()
        this.lastAdvance = time
      }
    }
  }
  var moveLeftToRight = {
    lastMove: 0,
    execute: function (sprite, context, time) {
      if (this.lastMove !== 0) {
        // TODO: 这里的100，是因为每帧限定在100ms，速度控制的姿势不好
        sprite.left =
          sprite.left - sprite.velocityX * ((time - this.lastMove) / 100)
        if (sprite.left < 0) {
          sprite.left = context.canvas.width
        }
      }
      this.lastMove = time
    }
  }

  var executor = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    runInPlace: runInPlace,
    moveLeftToRight: moveLeftToRight
  })

  /**
   * main
   *
   * 绘图库入口文件
   * 核心设计思路是，尽量贴近原生API。只做必要的限制，功能在原生 canvas 上进行增强
   */
  var Flowings = /** @class */ (function () {
    // 默认全屏创建
    function Flowings(id) {
      if (id === void 0) {
        id = ''
      }
      this.canvas = id
        ? getCanvasElementById(id)
        : createCanvas(screen.availWidth, screen.availHeight)
      this.context = getCanvasRenderingContext2D(this.canvas)
      this.sprites = []
    }
    return Flowings
  })()
  // 从已存在的画布初始化
  function getCanvasElementById(id) {
    // TODO: 小程序的适配
    var canvas = document.getElementById(id)
    if (!canvas || canvas.constructor !== HTMLCanvasElement) {
      throw new TypeError(
        'The element of id "' +
          id +
          '" is not a HTMLCanvasElement. Make sure a <canvas id="' +
          id +
          '""> element is present in the document.'
      )
    }
    return canvas
  }
  // 获取绘图上下文
  function getCanvasRenderingContext2D(node) {
    var context = node.getContext('2d')
    if (context === null) {
      throw new Error(
        'This browser does not support 2-dimensional canvas rendering contexts.'
      )
    }
    return context
  }
  // 创建画布
  function createCanvas(width, height) {
    var node = document.createElement('canvas')
    node.id = 'canvas'
    node.width = width || screen.width
    node.height = height || screen.height
    document.body.appendChild(node)
    return node
  }

  exports.Executor = executor
  exports.Flowings = Flowings
  exports.LayerHelper = LayerHelper
  exports.Painter = painter
  exports.Sprite = Sprite
  exports.createImage = createImage
  exports.default = Flowings

  return exports
})({})
