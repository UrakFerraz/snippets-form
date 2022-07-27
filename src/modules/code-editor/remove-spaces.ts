export function removeWhiteSpaces(code: string): string {
    const res = code.replace(/[\s\n\t\r\0]/gm, '')
    console.log(res)
    console.log(code)
    return res
}
