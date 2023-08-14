/**
 * Copies the given text to the clipboard.
 *
 * Attempts to use the modern clipboard API over the deprecated execCommand
 * method, but will fall back if needed.
 */
export function copyToClipboard(text: string): Promise<void> {
  /**
   * If the modern Clipboard API is available, attempt to use it.
   *
   * {@link https://developer.mozilla.org/docs/Web/API/Clipboard/writeText}
   *
   * The API is not available in older browsers or on insecure pages, so its
   * presence needs to be verified before attempting to call writeText().
   *
   * {@link https://webkit.org/blog/10855/async-clipboard-api/}
   */
  if (navigator.clipboard)
    return (
      navigator.clipboard
        .writeText(text)
        /**
         * If writeText() is called outside of an interaction, the browser may
         * throw an exception. When that happens, the deprecated method of
         * copying to the clipboard will be used as a fallback.
         */
        .catch((writeTextError) => {
          console.error(writeTextError)
          return copyToClipboardViaSelection(text)
        })
    )

  /**
   * Use the deprecated method of copying to the clipboard since the modern
   * Clipboard API was not available.
   */
  return copyToClipboardViaSelection(text)
}

/**
 * Uses the Document Selection and execCommand methods to copy text to the
 * clipboard. This is no longer recommended but is useful as a fallback when
 * the Clipboard API is not available.
 *
 * @deprecated navigator.clipboard is recommended instead, when available
 */
async function copyToClipboardViaSelection(text: string): Promise<void> {
  /**
   * Attempt to get a Selection object to be used for selecting the content of
   * a dynamically created text node.
   */
  const selection = window.getSelection()

  /**
   * There are some situations where the browser will return a null object.
   * When this happens, there is no way to select the dynamic text node.
   *
   * {@link https://developer.mozilla.org/docs/Web/API/Window/getSelection}
   */
  if (!selection) throw new Error("Selection object not available")

  /**
   * Creates a transient hidden node with the provided text as its content.
   * This node is attached to the end of the document body.
   */
  const textEl = document.createElement("span")

  textEl.innerText = text
  textEl.style.opacity = "0"

  document.body.appendChild(textEl)

  /**
   * Resets the current selection, saving its current value for restoration
   * after the copy operation.
   */
  const priorSelectionRanges: Array<Range> = []

  for (let rangeIdx = 0; rangeIdx < selection.rangeCount; rangeIdx++) {
    priorSelectionRanges.push(selection.getRangeAt(rangeIdx))
  }

  selection.removeAllRanges()

  /**
   * Creates a new range object and uses it to select the transient text node.
   */
  const range = document.createRange()

  range.selectNode(textEl)
  selection.addRange(range)

  /**
   * Call the copy command. After the command is executed, remove the transient
   * text node and restore the selected ranges to their value prior to the copy
   * operation regardless of success.
   */
  let copySucceeded: boolean
  let copyError: unknown

  /**
   * This method is non-standard and may not be available on all browsers.
   *
   * {@link https://developer.mozilla.org/docs/Web/API/document/execCommand}
   */
  try {
    copySucceeded = document.execCommand("copy")
  } catch (commandError) {
    copySucceeded = false
    copyError = commandError
  }

  document.body.removeChild(textEl)
  selection.removeAllRanges()

  priorSelectionRanges.forEach((priorSelectionRange) =>
    selection.addRange(priorSelectionRange)
  )

  /**
   * Now that the DOM has been cleaned up, bubble up any Error that was thrown
   * during the copy operation.
   */
  if (copyError) throw copyError

  /**
   * If the copy did not succeed, throw an Error.
   */
  if (!copySucceeded) throw new Error("Copy command is unsupported or blocked")
}
