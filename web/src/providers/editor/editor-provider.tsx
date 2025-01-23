'use client'

import { createContext, useContext, useReducer, Dispatch } from 'react'
import type { EditorAction } from './editor-actions'

// --------------------
// Tipos de Ações
// --------------------

// --------------------
// Tipos do Editor
// --------------------
export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'

// Ajuste aqui para permitir que type seja 'string | null'.
// Se quiser restringir para somente string, remova o '| null'
// e garanta em todo lugar que nunca retornará null.
export type EditorElement = {
  id: string
  styles: React.CSSProperties
  name: string
  type: string | null
  content: EditorElement[] | { href?: string; innerText?: string; src?: string }
}

export type Editor = {
  liveMode: boolean
  elements: EditorElement[]
  selectedElement: EditorElement
  device: DeviceTypes
  previewMode: boolean
  funnelPageId: string
  checkoutId?: string
  themeId?: string
  orderBumpEnabled: boolean
  orderBumpDetails?: {
    title: string
    description: string
    price: number
  }
}

export type HistoryState = {
  history: Editor[]
  currentIndex: number
}

export type EditorState = {
  editor: Editor
  history: HistoryState
}

// --------------------
// Estados Iniciais
// --------------------
const initialEditorState: Editor = {
  elements: [
    {
      content: [],
      id: '__body',
      name: 'Body',
      styles: {},
      type: '__body',
    },
  ],
  selectedElement: {
    id: '__default',
    content: [],
    name: 'Default',
    styles: {},
    type: '__default',
  },
  device: 'Desktop',
  previewMode: false,
  liveMode: false,
  funnelPageId: '',
  checkoutId: undefined,
  themeId: undefined,
  orderBumpEnabled: false,
  orderBumpDetails: undefined,
}

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
}

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
}

// --------------------
// Utils (Exemplo)
// --------------------
//
// As funções de 'HistoryManager' e 'EditorElementManager' não
// foram incluídas no snippet original, mas supondo algo como:

export const HistoryManager = {
  updateHistory: (state: EditorState, newEditor: Editor): HistoryState => {
    // Exemplo de lógica de histórico:
    const updatedHistory = [
      ...state.history.history.slice(0, state.history.currentIndex + 1),
      newEditor,
    ]
    return {
      history: updatedHistory,
      currentIndex: updatedHistory.length - 1,
    }
  },
  undo: (state: EditorState): EditorState => {
    if (state.history.currentIndex <= 0) return state
    return {
      ...state,
      editor: state.history.history[state.history.currentIndex - 1],
      history: {
        ...state.history,
        currentIndex: state.history.currentIndex - 1,
      },
    }
  },
  redo: (state: EditorState): EditorState => {
    if (state.history.currentIndex >= state.history.history.length - 1)
      return state
    return {
      ...state,
      editor: state.history.history[state.history.currentIndex + 1],
      history: {
        ...state.history,
        currentIndex: state.history.currentIndex + 1,
      },
    }
  },
}

export const EditorElementManager = {
  addElement: (
    elements: EditorElement[],
    containerId: string,
    elementDetails: EditorElement,
  ) => {
    // Exemplo: adicionar `elementDetails` dentro do elemento com ID `containerId`.
    return [...elements, elementDetails]
  },
  updateElement: (elements: EditorElement[], updated: EditorElement) => {
    // Exemplo: atualiza `elements` trocando o elemento que tiver `id === updated.id`
    return elements.map((el) => (el.id === updated.id ? updated : el))
  },
  deleteElement: (elements: EditorElement[], elementId: string) => {
    // Exemplo: remove o elemento que tiver `id === elementId`
    return elements.filter((el) => el.id !== elementId)
  },
}

// --------------------
// Reducer
// --------------------
const editorReducer = (
  state: EditorState = initialState,
  action: EditorAction,
): EditorState => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: EditorElementManager.addElement(
            state.editor.elements,
            action.payload.containerId,
            action.payload.elementDetails,
          ),
        },
        history: HistoryManager.updateHistory(state, state.editor),
      }

    case 'UPDATE_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: EditorElementManager.updateElement(
            state.editor.elements,
            action.payload.elementDetails,
          ),
          selectedElement:
            state.editor.selectedElement.id === action.payload.elementDetails.id
              ? action.payload.elementDetails
              : state.editor.selectedElement,
        },
        history: HistoryManager.updateHistory(state, state.editor),
      }

    case 'DELETE_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: EditorElementManager.deleteElement(
            state.editor.elements,
            action.payload.elementDetails.id,
          ),
        },
        history: HistoryManager.updateHistory(state, state.editor),
      }

    case 'CHANGE_CLICKED_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || {
            id: '__default',
            content: [],
            name: 'Default',
            styles: {},
            type: '__default',
          },
        },
      }

    case 'CHANGE_DEVICE':
      return {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      }

    case 'TOGGLE_PREVIEW_MODE':
      return {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      }

    case 'TOGGLE_LIVE_MODE':
      return {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload?.value
            ? action.payload.value
            : !state.editor.liveMode,
        },
      }

    case 'LOAD_DATA':
      return {
        ...initialState,
        editor: {
          ...initialEditorState,
          elements: action.payload.elements,
          liveMode: action.payload.withLive,
        },
      }

    case 'SET_FUNNELPAGE_ID':
      return {
        ...state,
        editor: {
          ...state.editor,
          funnelPageId: action.payload.funnelPageId,
        },
      }

    case 'SET_CHECKOUT_ID':
      return {
        ...state,
        editor: {
          ...state.editor,
          checkoutId: action.payload.checkoutId,
        },
      }

    case 'CHANGE_THEME':
      return {
        ...state,
        editor: {
          ...state.editor,
          themeId: action.payload.themeId,
        },
      }

    case 'TOGGLE_ORDER_BUMP':
      return {
        ...state,
        editor: {
          ...state.editor,
          orderBumpEnabled: action.payload.orderBumpEnabled,
        },
      }

    case 'UPDATE_ORDER_BUMP':
      return {
        ...state,
        editor: {
          ...state.editor,
          orderBumpDetails: action.payload.orderBumpDetails,
        },
      }

    case 'UNDO':
      return HistoryManager.undo(state)

    case 'REDO':
      return HistoryManager.redo(state)

    case 'RESET_EDITOR':
      return initialState

    default:
      return state
  }
}

// --------------------
// Context & Provider
// --------------------
export const EditorContext = createContext<{
  state: EditorState
  dispatch: Dispatch<EditorAction>
}>({
  state: initialState,
  dispatch: () => undefined,
})

type EditorProviderProps = {
  children: React.ReactNode
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}
