function validEmail(req, res, next) {
    let {email} = req.body;
    let regex = new RegExp('[\\w\\d\-\.\_]{1,256}[@]{1}[\\w\\d]{1,256}[.]{1}[\\w]{2,5}');

    if(!email) {
        return res.status(400).json({message: "O campo \"email\" é obrigatório"});
    }
    else if(!regex.test(email)) {
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

function validName(req, res, next) {
    let {name} = req.body;

    if(!name) {
        return res.status(400).json({message: "O campo \"name\" é obrigatório"}); 
    }
    else if(name.length < 3) {
        return res.status(400).json({message: "O \"name\" deve ter pelo menos 3 caracteres"});
    }

    return next();
}

function validAge(req, res, next) {
    let {age} = req.body;
    
    if(!age) {
        return res.status(400).json({message: "O campo \"age\" é obrigatório"});
    }
    else if(typeof age !== 'number') {
        return res.status(400).json({message: "O campo \"age\" deve ser um número"});
    }
    else if(age < 18) {
        return res.status(400).json({message: "O usuário deve ser maior de idade"});
    }


    return next();
}

function validInfo(req, res, next) {
    let {info} = req.body;
    
    if(!info) {
        return res.status(400).json({message: "O campo \"info\" é obrigatório"});
    }

    let {city, phoneNumber} = req.body.info

    if(!city) {
        return res.status(400).json({message: "O campo \"city\" é obrigatório"});
    }
    else if(!phoneNumber) {
        return res.status(400).json({message: "O campo \"phoneNumber\" é obrigatório"});
    }

    return next();
}   

module.exports = {
    validEmail,
    validPassword,
    validName,
    validAge,
    validInfo
}