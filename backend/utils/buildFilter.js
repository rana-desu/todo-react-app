const buildFilter = (query) => {
    const { status } = query

    const filter = {}
    if (status) filter.status = status
    
    return filter
}

module.exports = buildFilter