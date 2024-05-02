function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || email.trim() === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password || password.trim() === '') {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 8 caracteres' });
  }

  next();
}

function validateCreateUser(req, res, next) {
  const { name, age, info } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!('age' in req.body) || isNaN(age)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'O usuário deve ser maior de idade' });
  }

  if (!info || typeof info !== 'object' || Object.keys(info).length === 0) {
    return res.status(400).json({ message: 'O campo "info" é obrigatório' });
  }

  if (!info.city || info.city.trim() === '') {
    return res.status(400).json({ message: 'O campo "city" é obrigatório' });
  }

  if (!info.phoneNumber || info.phoneNumber.trim() === '') {
    return res
      .status(400)
      .json({ message: 'O campo "phoneNumber" é obrigatório' });
  }

  next();
}

function validateUserInput(req, res, next) {
  const { name, age, info } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age || isNaN(age)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'O usuário deve ser maior de idade' });
  }

  if (!info || typeof info !== 'object' || Object.keys(info).length === 0) {
    return res.status(400).json({ message: 'O campo "info" é obrigatório' });
  }

  if (!info.city || info.city.trim() === '') {
    return res.status(400).json({ message: 'O campo "city" é obrigatório' });
  }

  if (!info.phoneNumber || info.phoneNumber.trim() === '') {
    return res
      .status(400)
      .json({ message: 'O campo "phoneNumber" é obrigatório' });
  }

  next();
}

module.exports = { validateLogin, validateCreateUser, validateUserInput };
