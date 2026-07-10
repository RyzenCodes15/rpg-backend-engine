import { apiFetch } from '../api';

export interface CombatEvent {
  actor: string;
  action: string;
  damage: number;
  message: string;
}

export interface CombatSessionResponse {
  sessionId: string;
  characterId: string;
  monsterId: string;
  isActive: boolean;
  characterHp: number;
  characterMana: number;
  monsterHp: number;
  cooldowns: Record<string, number>;
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
  startCombat: async (characterId: string, monsterId: string): Promise<CombatSessionResponse> => {
    return apiFetch(`/combat/${characterId}/start/${monsterId}`, { method: 'POST' });
  },
  
  executeTurn: async (characterId: string, skillId?: string): Promise<CombatResponse> => {
    return apiFetch(`/combat/${characterId}/turn`, { 
        method: 'POST',
        body: skillId ? JSON.stringify({ skillId }) : undefined
    });
  },

  getActiveSession: async (characterId: string): Promise<CombatSessionResponse> => {
    return apiFetch(`/combat/${characterId}/session`);
  },

  getHistory: async (characterId: string): Promise<CombatHistoryResponse[]> => {
    return apiFetch(`/combat/${characterId}/history`);
  }
};
