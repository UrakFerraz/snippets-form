export default function copyToClipboard(code: string) {
    navigator.clipboard.writeText(code.trim()).then((code) => code)
}
