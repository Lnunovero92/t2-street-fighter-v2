import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighterById(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error('Fighter not found');
    }
    return fighter;
  }

  createFighter(data) {
    // Validaciones adicionales
    if (data.power < 1 || data.power > 100) {
      throw new Error('Power must be between 1 and 100');
    }
    if (data.defense < 1 || data.defense > 10) {
      throw new Error('Defense must be between 1 and 10');
    }
    if (data.health && (data.health < 80 || data.health > 120)) {
      throw new Error('Health must be between 80 and 120');
    }

    // Verificar si el nombre ya existe (case insensitive)
    const existingFighter = fighterRepository.getAll().find(fighter => fighter.name.toLowerCase() === data.name.toLowerCase());
    if (existingFighter) {
      throw new Error('Fighter with this name already exists');
    }

    // Establecer un valor predeterminado para la salud si no se proporciona
    data.health = data.health === undefined ? 85 : data.health;

    return fighterRepository.create(data);
  }

  updateFighter(id, data) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error('Fighter not found');
    }

    // Validaciones adicionales
    if (data.power !== undefined && (data.power < 1 || data.power > 100)) {
      throw new Error('Power must be between 1 and 100');
    }
    if (data.defense !== undefined && (data.defense < 1 || data.defense > 10)) {
      throw new Error('Defense must be between 1 and 10');
    }
    if (data.health !== undefined && (data.health < 80 || data.health > 120)) {
      throw new Error('Health must be between 80 and 120');
    }

    return fighterRepository.update(id, data);
  }

  deleteFighter(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error('Fighter not found');
    }
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
