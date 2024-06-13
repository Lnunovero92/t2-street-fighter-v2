import { fightRepository } from "../repositories/fightRepository.js";

class FightService {
  getAllFights() {
    return fightRepository.getAll();
  }

  getFightById(id) {
    const fight = fightRepository.getOne({ id });
    if (!fight) {
      throw new Error('Fight not found');
    }
    return fight;
  }

  createFight(data) {
    const { fighter1, fighter2 } = data;
    const fighterOne = fighterRepository.getOne({ id: fighter1 });
    const fighterTwo = fighterRepository.getOne({ id: fighter2 });

    if (!fighterOne || !fighterTwo) {
      throw new Error('One or both fighters not found');
    }

    const winner = this.determineWinner(fighterOne, fighterTwo);
    const fight = fightRepository.create({ fighter1, fighter2, winner: winner.id });
    return { ...fight, winner };
  }

  updateFight(id, data) {
    const fight = fightRepository.getOne({ id });
    if (!fight) {
      throw new Error('Fight not found');
    }
    return fightRepository.update(id, data);
  }

  deleteFight(id) {
    const fight = fightRepository.getOne({ id });
    if (!fight) {
      throw new Error('Fight not found');
    }
    return fightRepository.delete(id);
  }

  determineWinner(fighterOne, fighterTwo) {
    // Implementa la lógica para determinar el ganador de la pelea
    const fighterOnePower = fighterOne.power - fighterTwo.defense;
    const fighterTwoPower = fighterTwo.power - fighterOne.defense;
    
    return fighterOnePower > fighterTwoPower ? fighterOne : fighterTwo;
  }
}

const fightService = new FightService();

export { fightService };
