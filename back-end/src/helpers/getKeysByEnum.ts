const getKeyByEnum = (obj, value) => {
    const keyIndex = Object.values(obj).indexOf(value)

    return Object.keys(obj)[keyIndex]
}

export { getKeyByEnum }
