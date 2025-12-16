import {
  computePosition,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  type Placement,
  type Middleware,
} from '@floating-ui/dom'

export type { Placement }

export interface PositioningOptions {
  placement?: Placement
  offset?: number
  flip?: boolean
  shift?: boolean
  arrow?: HTMLElement | null
  arrowTip?: HTMLElement | null
}

export interface PositioningResult {
  x: number
  y: number
  placement: Placement
  middlewareData: {
    arrow?: {
      x?: number
      y?: number
    }
  }
  cleanup: () => void
}

/**
 * Compute and auto-update position using Floating UI
 */
export function createPositioning(
  reference: HTMLElement,
  floating: HTMLElement,
  options: PositioningOptions = {}
): PositioningResult {
  const {
    placement = 'bottom',
    offset: offsetValue = 8,
    flip: enableFlip = true,
    shift: enableShift = true,
    arrow: arrowElement = null,
    arrowTip: arrowTipElement = null,
  } = options

  const middleware: Middleware[] = []

  middleware.push(offset(offsetValue))

  if (enableFlip) {
    middleware.push(
      flip({
        fallbackAxisSideDirection: 'start',
      })
    )
  }

  if (enableShift) {
    middleware.push(shift({ padding: 5 }))
  }

  if (arrowElement) {
    middleware.push(arrow({ element: arrowElement }))
  }

  let result: PositioningResult = {
    x: 0,
    y: 0,
    placement,
    middlewareData: {},
    cleanup: () => {},
  }

  const update = async () => {
    const computed = await computePosition(reference, floating, {
      placement,
      middleware,
    })

    Object.assign(floating.style, {
      position: 'absolute',
      left: `${computed.x}px`,
      top: `${computed.y}px`,
    })

    result.x = computed.x
    result.y = computed.y
    result.placement = computed.placement
    result.middlewareData = computed.middlewareData

    if (arrowElement && computed.middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = computed.middlewareData.arrow
      const side = computed.placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[side]

      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
      })
    }

    if (arrowTipElement) {
      const side = computed.placement.split('-')[0]
      const rotations = {
        top: '225deg',   // Arrow points down
        right: '-45deg', // Arrow points left
        bottom: '45deg', // Arrow points up
        left: '135deg',  // Arrow points right
      }
      arrowTipElement.style.transform = `rotate(${rotations[side as keyof typeof rotations]})`
    }
  }

  update()

  const cleanup = autoUpdate(reference, floating, update)

  result.cleanup = cleanup

  return result
}
