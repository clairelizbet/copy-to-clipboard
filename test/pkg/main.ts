import {
  copyToClipboard,
  copyToClipboardViaSelection,
} from "@clairelizbet/copy-to-clipboard"

document.querySelector("#springfield").addEventListener("click", () => {
  copyToClipboard("Springfield")
})

document.querySelector("#sanfrancisco").addEventListener("click", () => {
  copyToClipboardViaSelection("San Francisco")
})
