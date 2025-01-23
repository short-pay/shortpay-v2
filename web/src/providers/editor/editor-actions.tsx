import type { DeviceTypes, EditorElement } from './editor-provider'

export type EditorAction =
  | {
      type: 'ADD_ELEMENT'
      payload: {
        containerId: string
        elementDetails: EditorElement
      }
    }
  | {
      type: 'UPDATE_ELEMENT'
      payload: {
        elementDetails: EditorElement
      }
    }
  | {
      type: 'DELETE_ELEMENT'
      payload: {
        elementDetails: EditorElement
      }
    }
  | {
      type: 'CHANGE_CLICKED_ELEMENT'
      payload: {
        // Permite opcionalmente esse objeto "fallback" com type: null
        elementDetails?:
          | EditorElement
          | {
              id: ''
              content: []
              name: ''
              styles: {}
              type: null
            }
      }
    }
  | {
      type: 'CHANGE_DEVICE'
      payload: {
        device: DeviceTypes
      }
    }
  | {
      type: 'TOGGLE_PREVIEW_MODE'
    }
  | {
      type: 'TOGGLE_LIVE_MODE'
      payload?: {
        value: boolean
      }
    }
  | { type: 'REDO' }
  | { type: 'UNDO' }
  | {
      type: 'LOAD_DATA'
      payload: {
        elements: EditorElement[]
        withLive: boolean
      }
    }
  | {
      type: 'SET_FUNNELPAGE_ID'
      payload: {
        funnelPageId: string
      }
    }
  | {
      type: 'DUPLICATE_ELEMENT'
      payload: {
        elementDetails: EditorElement
      }
    }
  | {
      type: 'RESET_EDITOR'
    }
  | {
      type: 'CHANGE_THEME'
      payload: {
        themeId: string
      }
    }
  | {
      type: 'VALIDATE_ELEMENT'
      payload: {
        elementId: string
      }
    }
  | {
      type: 'REORDER_ELEMENTS'
      payload: {
        sourceIndex: number
        destinationIndex: number
      }
    }
  | {
      type: 'SET_CHECKOUT_ID'
      payload: {
        checkoutId: string
      }
    }
  | {
      type: 'TOGGLE_ORDER_BUMP'
      payload: {
        orderBumpEnabled: boolean
      }
    }
  | {
      type: 'UPDATE_ORDER_BUMP'
      payload: {
        orderBumpDetails: {
          title: string
          description: string
          price: number
        }
      }
    }
