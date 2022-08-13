function typeError(message: string): Error {
    throw new Error(`==============${message}==============`)
}

function tryCatchError(e: unknown) {
    if (typeof e === 'string') {
        e.toUpperCase()
    } else if (e instanceof Error) {
        e.message
    }
}

export { typeError, tryCatchError }
