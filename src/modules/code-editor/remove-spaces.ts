export function removeWhiteSpaces(code: string): string {
    // https://regex101.com/r/tUpuTr/2
    const res = code.replace(/[\n\t\r\0]|\s\s+/gm, '')
    return res.trim()
}
