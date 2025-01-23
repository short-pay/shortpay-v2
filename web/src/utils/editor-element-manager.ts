import type { EditorElement } from '@/providers/editor/editor-provider'

export class EditorElementManager {
  static addElement(
    elements: EditorElement[],
    containerId: string,
    newElement: EditorElement,
  ): EditorElement[] {
    return elements.map((element) => {
      if (element.id === containerId && Array.isArray(element.content)) {
        return {
          ...element,
          content: [...(element.content as EditorElement[]), newElement],
        }
      }
      if (Array.isArray(element.content)) {
        return {
          ...element,
          content: this.addElement(
            element.content as EditorElement[],
            containerId,
            newElement,
          ),
        }
      }
      return element
    })
  }

  static updateElement(
    elements: EditorElement[],
    updatedElement: EditorElement,
  ): EditorElement[] {
    return elements.map((element) => {
      if (element.id === updatedElement.id) {
        return { ...element, ...updatedElement }
      }
      if (Array.isArray(element.content)) {
        return {
          ...element,
          content: this.updateElement(
            element.content as EditorElement[],
            updatedElement,
          ),
        }
      }
      return element
    })
  }

  static deleteElement(
    elements: EditorElement[],
    elementId: string,
  ): EditorElement[] {
    return elements
      .filter((element) => element.id !== elementId)
      .map((element) => {
        if (Array.isArray(element.content)) {
          return {
            ...element,
            content: this.deleteElement(
              element.content as EditorElement[],
              elementId,
            ),
          }
        }
        return element
      })
  }
}
