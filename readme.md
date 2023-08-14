# Copy to Clipboard

Small (~600 bytes [minified](https://github.com/clairelizbet/copy-to-clipboard/releases/latest)+gzipped)
script for copying text to the clipboard.

It prefers the modern [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
and falls back to the deprecated [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/document/execCommand)
method as needed.

## Installation

Available [from NPM](https://www.npmjs.com/package/@clairelizbet/copy-to-clipboard)

```sh
npm install @clairelizbet/copy-to-clipboard
```

You can also find the latest compiled and minified version on the current
[release page](https://github.com/clairelizbet/copy-to-clipboard/releases/latest).

## Usage

The script is written as a module, with `copyToClipboard` as its sole named
export. Most of the time,

```js
import { copyToClipboard } from "@clairelizbet/copy-to-clipboard"
```

The `copyToClipboard` method is asynchronous and may throw an Error.

If the Error will be handled (e.g. by an error boundary) and you do not need to
wait for the copy operation to complete, you can just call it.

```js
/**
 * Copy the value "Springfield" to the clipboard
 */
copyToClipboard("Springfield")

// The copy operation is not guaranteed to be complete at this point.
// Some of this block may never be reached if an Error is thrown.
```

Most of the time, you'll want to handle the async copy operation as a Promise.

```js
copyToClipboard("Springfield")
  .then(() => {
    // Copy operation has succeeded at this point
  })
  .catch((copyError) => {
    // Copy operation has failed at this point
  })
```

If you're calling `copyToClipboard` from an async function, you could also use
async/await.

```js
try {
  await copyToClipboard("Springfield")
} catch (copyError) {
  // Copy operation has failed at this point
}

// Copy operation has succeeded at this point
```

## License

[![CC0 Public Domain](https://raw.githubusercontent.com/clairelizbet/licenses/main/creative-commons/cc-zero/cc-zero.svg)](license.md)
