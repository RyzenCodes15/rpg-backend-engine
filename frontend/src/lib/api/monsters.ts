import { apiFetch } from '../api';

export interface Monster {
  id: string;
  name: string;
  description: string;
  level: number;
  health: number;
  attack: number;
  defense: number;
  speed: number;
  goldReward: number;
  experienceReward: number;
}

export const monsterApi = {
  getAll: async (): Promise<Monster[]> => {
    return apiFetch('/monsters');
  },
  
  getById: async (id: string): Promise<Monster> => {
    return apiFetch(`/monsters/${id}`);
  }
};
