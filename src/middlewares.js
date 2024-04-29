function validateEmail (req, res, next) {
    const {email} = req.body
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return res.status(400).json({"message": "O campo \"email\" é obrigatório"})
    }

    if (!regex.test(email)) {
        return res.status(400).json({"message": "O \"email\" deve ter o formato \"email@email.com\""})
    }


    next()
}

function validatePassword (req, res, next) {
    const {password} = req.body
    if (!password) {
        return res.status(400).json({"message": "O campo \"password\" é obrigatório"})
    }

    if (password.length < 8) {
        return res.status(400).json({"message": "O \"password\" deve ter pelo menos 8 caracteres"})
    }

    next()
}

function validateName (req, res, next) {
    const {name} = req.body

    if (!name) {
        return res.status(400).json({"message": "O campo \"name\" é obrigatório"})
    }

    if (name.length < 3) {
        return res.status(400).json({"message": "O \"name\" deve ter pelo menos 3 caracteres"})
    }

    next()
}

function validateAge (req, res, next) {
    const {age} = req.body

    if (!age) {
        return res.status(400).json({"message": "O campo \"age\" é obrigatório"})
    }

    if (age < 18) {
        return res.status(400).json({"message": "O usuário deve ser maior de idade"})
    }

    next()
}

function validateInfo (req, res, next) {
    const {info} = req.body

    if (!info) {
        return res.status(400).json({"message": "O campo \"info\" é obrigatório"})
    }

    if (!info.city) {
        return res.status(400).json({"message": "O campo \"city\" é obrigatório"})
    }

    if (!info.phoneNumber) {
        return res.status(400).json({"message": "O campo \"phoneNumber\" é obrigatório"})
    }
    
    next()
}

module.exports = {validateEmail, validatePassword, validateName, validateAge, validateInfo}