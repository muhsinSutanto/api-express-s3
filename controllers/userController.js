const models = require ("../models")

exports.getAll = async (req, res) => {
    try {
        const users = await models.users.findAll()

        res.json({users})
        
    } catch (error) {
        return res.send(error)
    }
}

exports.createUser = (req, res) => {
    res.send('Users')
}

