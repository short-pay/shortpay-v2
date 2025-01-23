import type { Editor, EditorState } from '@/providers/editor/editor-provider'

export class HistoryManager {
  static updateHistory(state: EditorState, updatedEditor: Editor): EditorState {
    const { history, currentIndex } = state.history
    const newHistory = [...history.slice(0, currentIndex + 1), updatedEditor]

    return {
      ...state,
      editor: updatedEditor,
      history: {
        history: newHistory,
        currentIndex: newHistory.length - 1,
      },
    }
  }

  static undo(state: EditorState): EditorState {
    const { currentIndex, history } = state.history

    if (currentIndex === 0) return state

    const previousIndex = currentIndex - 1
    return {
      ...state,
      editor: history[previousIndex],
      history: {
        ...state.history,
        currentIndex: previousIndex,
      },
    }
  }

  static redo(state: EditorState): EditorState {
    const { currentIndex, history } = state.history

    if (currentIndex >= history.length - 1) return state

    const nextIndex = currentIndex + 1
    return {
      ...state,
      editor: history[nextIndex],
      history: {
        ...state.history,
        currentIndex: nextIndex,
      },
    }
  }
}
