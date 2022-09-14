function typeError(message: string): Error {
    throw new Error(`==============${message}==============`)
}

function tryCatchError(e: unknown): string | undefined {
    if (typeof e === 'string') {
        return e.toUpperCase()
    } else if (e instanceof Error) {
        return e.message
    }
}

export { typeError, tryCatchError }
