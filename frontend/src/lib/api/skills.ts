import { apiFetch } from '../api';

export interface SkillResponse {
  id: string;
  name: string;
  description: string;
  classRestriction: string;
  requiredLevel: number;
  manaCost: number;
  cooldown: number;
  baseDamage: number;
  skillType: string;
  element: string;
  icon: string;
  animationName: string;
  statusEffectType: string | null;
  unlocked: boolean;
}

export const skillApi = {
  getCharacterSkills: async (characterId: string): Promise<SkillResponse[]> => {
    return apiFetch(`/skills/${characterId}`);
  }
};
