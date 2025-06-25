const buildFilter = (query) => {
    const { status, searchBy, searchTerm } = query

    const filter = {}
    if (status) filter.status = status
    if (searchBy && searchTerm) {
        filter[searchBy] = {
            $regex: searchTerm,
            $options: 'i',
        }
    }
    
    return filter
}

module.exports = buildFilter