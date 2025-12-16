import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  duration?: number
  targetDate?: string | number | Date
  autoStart?: boolean
}

export default defineComponent({
  name: 'countdown',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const isTargetDateMode = props.targetDate !== undefined

    let targetDate = 0
    let initialDuration = 10

    if (isTargetDateMode) {
      if (typeof props.targetDate === 'string') {
        targetDate = new Date(props.targetDate).getTime()
      } else if (typeof props.targetDate === 'number') {
        targetDate = props.targetDate
      } else {
        targetDate = props.targetDate!.getTime()
      }

      initialDuration = Math.max(0, Math.floor((targetDate - Date.now()) / 1000))
    } else {
      initialDuration = props.duration ?? 10
    }

    return {
      rootId,
      isTargetDateMode,
      targetDate,
      duration: initialDuration,
      remaining: initialDuration,
      autoStart: props.autoStart ?? true,

      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,

      state: 'idle' as 'idle' | 'running' | 'paused' | 'finished',
      _timerId: null as number | null,

      get isPaused() {
        return this.state === 'paused'
      },

      get isFinished() {
        return this.state === 'finished'
      },

      init() {
        this.remaining = this.duration
        this.updateDisplay()

        if (this.autoStart) {
          this.start()
        }
      },

      updateDisplay() {
        this.days = Math.floor(this.remaining / 86400)
        this.hours = Math.floor((this.remaining % 86400) / 3600)
        this.minutes = Math.floor((this.remaining % 3600) / 60)
        this.seconds = this.remaining % 60
      },

      tick() {
        if (this.isTargetDateMode) {
          this.remaining = Math.max(0, Math.floor((this.targetDate - Date.now()) / 1000))
        } else {
          if (this.remaining > 0) {
            this.remaining -= 1
          }
        }

        this.updateDisplay()

        if (this.remaining <= 0) {
          this.remaining = 0
          this.state = 'finished'

          if (this._timerId !== null) {
            clearInterval(this._timerId)
            this._timerId = null
          }

          this.$dispatch('complete')
        }
      },

      start() {
        if (this._timerId !== null) {
          return
        }

        this.state = 'running'
        this._timerId = window.setInterval(() => this.tick(), 1000)

        this.$dispatch('start')
      },

      pause() {
        if (this.isTargetDateMode || this._timerId === null) {
          return
        }

        clearInterval(this._timerId)
        this._timerId = null
        this.state = 'paused'

        this.$dispatch('pause')
      },

      resume() {
        if (this.isTargetDateMode || this.state !== 'paused') {
          return
        }

        this.state = 'running'
        this._timerId = window.setInterval(() => this.tick(), 1000)

        this.$dispatch('resume')
      },

      stop() {
        if (this.isTargetDateMode) {
          return
        }

        if (this._timerId !== null) {
          clearInterval(this._timerId)
          this._timerId = null
        }

        this.state = 'idle'
        this.remaining = this.duration
        this.updateDisplay()

        this.$dispatch('stop')
      },

      restart() {
        if (this.isTargetDateMode) {
          this.remaining = Math.max(0, Math.floor((this.targetDate - Date.now()) / 1000))
          this.state = 'idle'
          this.updateDisplay()

          if (this._timerId === null && this.remaining > 0) {
            this.state = 'running'
            this._timerId = window.setInterval(() => this.tick(), 1000)
          }
        } else {
          this.stop()
          this.start()
        }

        this.$dispatch('restart')
      },

      setDuration(seconds: number) {
        if (this.isTargetDateMode) {
          return
        }

        this.duration = seconds
        this.remaining = seconds
        this.updateDisplay()
      },

      setTargetDate(date: string | number | Date) {
        if (!this.isTargetDateMode) {
          return
        }

        if (typeof date === 'string') {
          this.targetDate = new Date(date).getTime()
        } else if (typeof date === 'number') {
          this.targetDate = date
        } else {
          this.targetDate = date.getTime()
        }

        this.remaining = Math.max(0, Math.floor((this.targetDate - Date.now()) / 1000))
        this.updateDisplay()
      },

      formatTime() {
        let formatted = ''

        if (this.days > 0) {
          formatted += `${this.days}d `
        }

        if (this.days > 0 || this.hours > 0) {
          formatted += `${this.hours.toString().padStart(2, '0')}:`
        }

        formatted += `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`

        return formatted.trim()
      },
    }
  }),

  parts: {
    root(api) {
      return {
        id: api.rootId,
        'data-scope': 'countdown',
        'data-part': 'root',
        'x-bind:data-state': () => api.state,
        'x-bind:data-paused': () => (api.isPaused ? '' : undefined),
        'x-bind:data-finished': () => (api.isFinished ? '' : undefined),
      }
    },

    display(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'display',
        'x-bind:data-state': () => api.state,
        'x-bind:data-paused': () => (api.isPaused ? '' : undefined),
        'x-bind:data-finished': () => (api.isFinished ? '' : undefined),
      }
    },

    days(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'days',
        'x-text': () => api.days,
      }
    },

    hours(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'hours',
        'x-text': () => api.hours.toString().padStart(2, '0'),
      }
    },

    minutes(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'minutes',
        'x-text': () => api.minutes.toString().padStart(2, '0'),
      }
    },

    seconds(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'seconds',
        'x-text': () => api.seconds.toString().padStart(2, '0'),
      }
    },

    separator() {
      return {
        'data-scope': 'countdown',
        'data-part': 'separator',
      }
    },

    control(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'control',
        'x-bind:data-state': () => api.state,
        'x-bind:data-paused': () => (api.isPaused ? '' : undefined),
        'x-bind:data-finished': () => (api.isFinished ? '' : undefined),
      }
    },

    actionTrigger(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'action-trigger',
        type: 'button',
        'x-bind:data-state': () => api.state,
        'x-bind:data-paused': () => (api.isPaused ? '' : undefined),
        'x-bind:data-finished': () => (api.isFinished ? '' : undefined),
        'x-on:click'() {
          if (api.isFinished) {
            return
          }
          if (api.isPaused) {
            api.resume()
          } else {
            api.pause()
          }
        },
      }
    },

    startTrigger(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'start-trigger',
        type: 'button',
        'x-bind:data-state': () => api.state,
        'x-on:click'() {
          api.start()
        },
      }
    },

    stopTrigger(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'stop-trigger',
        type: 'button',
        'x-bind:data-state': () => api.state,
        'x-bind:data-finished': () => (api.isFinished ? '' : undefined),
        'x-on:click'() {
          api.stop()
        },
      }
    },

    restartTrigger(api) {
      return {
        'data-scope': 'countdown',
        'data-part': 'restart-trigger',
        type: 'button',
        'x-bind:data-state': () => api.state,
        'x-on:click'() {
          api.restart()
        },
      }
    },
  },
})
