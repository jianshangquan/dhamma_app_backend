const Utils = {
    searchParams(url) {
        const { searchParams } = new URL(url);
        return Object.fromEntries(searchParams.entries())
    }
}

export default Utils;