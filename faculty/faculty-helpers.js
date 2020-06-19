const db = require('../data/data-config');


const getAll = () => {
    return db('faculty')
}

const addUser = (user) => {
    return db('faculty')
    .insert(user)
}
const findBy = (filter) => {
    return db('faculty')
    .where(filter)
}

module.exports = {
    getAll,
    addUser,
    findBy
}
