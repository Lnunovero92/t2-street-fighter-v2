import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { email, phoneNumber, password, firstName, lastName } = req.body;
  const missingFields = [];

  if (!firstName) missingFields.push("firstName");
  if (!lastName) missingFields.push("lastName");
  if (!email) {
    missingFields.push("email");
  } else if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({ error: true, message: 'Invalid email domain' });
  }
  if (!phoneNumber) {
    missingFields.push("phoneNumber");
  } else if (!/^\+380\d{9}$/.test(phoneNumber)) {
    return res.status(400).json({ error: true, message: 'Invalid phone number format' });
  }
  if (!password) {
    missingFields.push("password");
  } else if (password.length < 3) {
    return res.status(400).json({ error: true, message: 'Password is too short' });
  }

  if (missingFields.length > 0) {
    return res.status(400).json({ error: true, message: `Missing required fields: ${missingFields.join(', ')}` });
  }


  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const { email, phoneNumber, password, firstName, lastName } = req.body;

  if (!email && !phoneNumber && !password && !firstName && !lastName) {
    return res.status(400).json({ error: true, message: 'At least one field must be provided for update' });
  }

  if (email && !email.endsWith('@gmail.com')) {
    return res.status(400).json({ error: true, message: 'Invalid email domain' });
  }

  if (phoneNumber && !/^\+380\d{9}$/.test(phoneNumber)) {
    return res.status(400).json({ error: true, message: 'Invalid phone number format' });
  }

  if (password && password.length < 3) {
    return res.status(400).json({ error: true, message: 'Password is too short' });
  }


  next();
};

export { createUserValid, updateUserValid };
