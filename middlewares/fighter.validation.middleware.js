import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const { name, power, defense, health } = req.body;
  const missingFields = [];

  if (!name) missingFields.push("name");
  if (power === undefined) {
    missingFields.push("power");
  } else if (power < 1 || power > 100) {
    return res.status(400).json({ error: true, message: 'Power must be between 1 and 100' });
  }
  if (defense === undefined) {
    missingFields.push("defense");
  } else if (defense < 1 || defense > 10) {
    return res.status(400).json({ error: true, message: 'Defense must be between 1 and 10' });
  }
  if (health !== undefined && (health < 80 || health > 120)) {
    return res.status(400).json({ error: true, message: 'Health must be between 80 and 120' });
  }

  if (missingFields.length > 0) {
    return res.status(400).json({ error: true, message: `Missing required fields: ${missingFields.join(', ')}` });
  }
  
  // Establecer un valor predeterminado para la salud si no se proporciona
  req.body.health = health === undefined ? 85 : health;

  next();
};

const updateFighterValid = (req, res, next) => {
  const { name, power, defense, health } = req.body;

  if (!name && power === undefined && defense === undefined && health === undefined) {
    return res.status(400).json({ error: true, message: 'At least one field must be provided for update' });
  }

  if (power !== undefined && (power < 1 || power > 100)) {
    return res.status(400).json({ error: true, message: 'Power must be between 1 and 100' });
  }

  if (defense !== undefined && (defense < 1 || defense > 10)) {
    return res.status(400).json({ error: true, message: 'Defense must be between 1 and 10' });
  }

  if (health !== undefined && (health < 80 || health > 120)) {
    return res.status(400).json({ error: true, message: 'Health must be between 80 and 120' });
  }

  next();
};

export { createFighterValid, updateFighterValid };
