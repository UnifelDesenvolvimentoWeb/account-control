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

module.exports = { validateLogin };
