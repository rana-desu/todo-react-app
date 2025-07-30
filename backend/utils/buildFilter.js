const buildFilter = (query) => {
    const { status, categories, searchBy, searchTerm } = query

    const filter = { }
    if (status) filter.status = status
    if (searchBy && searchTerm) {
        filter[searchBy] = {
            $regex: searchTerm,
            $options: 'i',
        }
    }

    if (categories) {
        filter.categories = {
            $in: categories.split(',')
        }
    }
    
    return filter
}

module.exports = buildFilter