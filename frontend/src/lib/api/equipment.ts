import { apiFetch } from '../api';
import { Item } from './inventory';

export interface Equipment {
  id: string;
  characterId: string;
  weapon: Item | null;
  helmet: Item | null;
  armor: Item | null;
  boots: Item | null;
}

export type EquipmentSlot = 'WEAPON' | 'HELMET' | 'ARMOR' | 'BOOTS';

export const getEquipment = async (characterId: string): Promise<Equipment> => {
  return apiFetch(`/characters/${characterId}/equipment`);
};

export const equipItem = async (characterId: string, slot: EquipmentSlot, itemId: string): Promise<void> => {
  await apiFetch(`/characters/${characterId}/equipment/${slot}/equip/${itemId}`, {
    method: 'POST',
  });
};

export const unequipItem = async (characterId: string, slot: EquipmentSlot): Promise<void> => {
  await apiFetch(`/characters/${characterId}/equipment/${slot}/unequip`, {
    method: 'POST',
  });
};
