function validEmail(req, res, next) {
    let {email} = req.body;
    let regex = new RegExp('[\\w\\d\-\.\_]{1,256}[@]{1}[\\w\\d]{1,256}[.]{1}[\\w]{2,5}');

    if(!email) {
        console.log('Empty')
        return res.status(400).json({message: "O campo \"email\" é obrigatório"});
    }
    else if(!regex.test(email)) {
        console.log('Invalid Format')
        return res.status(400).json({message: "O \"email\" deve ter o formato \"email@email.com\""});
    }

    return next();
}

function validPassword(req, res, next) {
    let {password} = req.body;

    if(!password) {
        return res.status(400).json({message: "O campo \"password\" é obrigatório"});
    }
    else if(password.length < 8) {
        return res.status(400).json({message: "O \"password\" deve ter pelo menos 8 caracteres"});
    }

    return next();
}

module.exports = {
    validEmail,
    validPassword
}