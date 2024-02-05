# Copy to Clipboard

Small (~600 bytes [minified](https://github.com/clairelizbet/copy-to-clipboard/releases/latest)+gzipped)
script for copying text to the clipboard.

It uses the modern [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
and falls back to the deprecated [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/document/execCommand)
method as needed.

## Installation

```sh
npm install @clairelizbet/copy-to-clipboard
```

You can also find the latest compiled and minified version on the current
[release page](https://github.com/clairelizbet/copy-to-clipboard/releases/latest).

## Usage

The script is written as a module, with named exports.

- `copyToClipboard(text: string)` - Copies using the best available method (Clipboard or Selection API)
- `copyToClipboardViaSelection(text: string)` - Copies using the legacy Selection API

```js
import { copyToClipboard } from "@clairelizbet/copy-to-clipboard"
import { copyToClipboardViaSelection } from "@clairelizbet/copy-to-clipboard"
```

These methods **are asynchronous and may throw an Error** if the copy command is rejected so it's a good idea to have error handling.

## License

[![CC0 Public Domain](https://raw.githubusercontent.com/clairelizbet/licenses/main/creative-commons/cc-zero/cc-zero.svg)](license.md)
