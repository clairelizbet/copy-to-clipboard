# Copy to Clipboard

Small (~600 bytes minified+gzipped) script for copying text to the clipboard.

It prefers the modern [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
and falls back to the deprecated [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/document/execCommand)
method as needed.

## Usage

If you wanted to copy the value "Springfield" to the clipboard,
here's how you would do that:

```js
/**
 * copyToClipboard is asynchronous and may throw an Error.
 * If the Error will be handled (e.g. by an error boundary) and you do not
 * need to wait for the copy operation to complete, you can just call it.
 */

copyToClipboard("Springfield")

// The copy operation is not guaranteed to be complete at this point.
// Some of this block may never be reached if an Error is thrown.

/**
 * In many cases you will want to handle the async copy operation as a Promise.
 */

copyToClipboard("Springfield")
  .then(() => {
    // Copy operation has succeeded at this point
  })
  .catch((copyError) => {
    // Copy operation has failed at this point
  })

/**
 * Or, by calling it from an async function and using await.
 */

try {
  await copyToClipboard("Springfield")
} catch (copyError) {
  // Copy operation has failed at this point
}

// Copy operation has succeeded at this point
```

## License

[![CC0 Public Domain](https://raw.githubusercontent.com/clairelizbet/licenses/main/creative-commons/cc-zero/cc-zero.svg)](license.md)
