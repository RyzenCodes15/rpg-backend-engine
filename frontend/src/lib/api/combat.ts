import { apiFetch } from '../api';

export interface CombatEvent {
  actor: string;
  action: string;
  damage: number;
  message: string;
}

export interface CombatResponse {
  isVictory: boolean;
  damageDealt: number;
  damageTaken: number;
  goldEarned: number;
  experienceEarned: number;
  log: CombatEvent[];
  itemsDropped: string[];
}

export interface CombatHistoryResponse {
  id: string;
  monsterId: string;
  isVictory: boolean;
  damageDealt: number;
  damageTaken: number;
  goldEarned: number;
  experienceEarned: number;
  timestamp: string;
}

export const combatApi = {
  fight: async (characterId: string, monsterId: string): Promise<CombatResponse> => {
    return apiFetch(`/combat/${characterId}/fight/${monsterId}`, { method: 'POST' });
  },
  
  getHistory: async (characterId: string): Promise<CombatHistoryResponse[]> => {
    return apiFetch(`/combat/${characterId}/history`);
  }
};
