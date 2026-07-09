import { apiFetch } from '../api';

export interface CharacterStats {
  health: number;
  mana: number;
  attack: number;
  defense: number;
  speed: number;
  criticalChance: number;
}

export interface Character {
  id: string;
  name: string;
  characterClass: 'WARRIOR' | 'MAGE' | 'ARCHER';
  level: number;
  experience: number;
  gold: number;
  currentHealth: number;
  currentMana: number;
  baseStats: CharacterStats;
}

export const getCharacters = async (): Promise<Character[]> => {
  return apiFetch('/characters');
};

export const getCharacter = async (id: string): Promise<Character> => {
  return apiFetch(`/characters/${id}`);
};

export const createCharacter = async (name: string, characterClass: string): Promise<Character> => {
  return apiFetch('/characters', {
    method: 'POST',
    body: JSON.stringify({ name, characterClass }),
  });
};

export const deleteCharacter = async (id: string): Promise<void> => {
  await apiFetch(`/characters/${id}`, {
    method: 'DELETE',
  });
};

// Development / Testing
export const addExperience = async (characterId: string, amount: number = 1000): Promise<void> => {
  await apiFetch(`/characters/${characterId}/exp?amount=${amount}`, {
    method: 'POST',
  });
};

export const restAtCamp = async (characterId: string): Promise<Character> => {
  return apiFetch(`/camp/rest/${characterId}`, {
    method: 'POST',
  });
};
