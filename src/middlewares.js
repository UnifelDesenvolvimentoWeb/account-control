function validateEmail(req, res, next) {
    const { email } = req.body
    const regex = /^\S+@\S+\.\S+$/;
    const validEmail = regex.test(email)

    if (!email) {
        return res.status(400).json({message: 'O campo \"email\" é obrigatório'})
    }
    if (!validEmail) {
        return res.status(400).json({message: 'O \"email\" deve ter o formato \"email@email.com\"'})
    }
    next()
}

function validatePassword(req, res, next) {
    const { password } = req.body

    if (!password) {
        return res.status(400).json({message: 'O campo \"password\" é obrigatório'})
    }
    if (password < 8) {
        return res.status(400).json({message: 'O \"password\" deve ter pelo menos 8 caracteres'})
    }

    next()
}

module.exports = {validateEmail, validatePassword}