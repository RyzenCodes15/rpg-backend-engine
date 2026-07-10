import { apiFetch } from '../api';

export interface ItemStats {
  bonusHealth: number;
  bonusMana: number;
  bonusAttack: number;
  bonusDefense: number;
  bonusSpeed: number;
  bonusCriticalChance: number;
  bonusDodgeChance: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  category: 'WEAPON' | 'HELMET' | 'CHEST_ARMOR' | 'GLOVES' | 'BOOTS' | 'SHIELD' | 'RING' | 'AMULET' | 'CAPE' | 'LEG_ARMOR' | 'CONSUMABLE' | 'MATERIAL' | 'QUEST_ITEM';
  value: number;
  requiredLevel: number;
  stats: ItemStats;
}

export interface InventorySlot {
  id: string;
  slotIndex: number;
  item: Item;
  quantity: number;
}

export interface Inventory {
  id: string;
  characterId: string;
  capacity: number;
  slots: InventorySlot[];
}

export const getInventory = async (characterId: string): Promise<Inventory> => {
  return apiFetch(`/characters/${characterId}/inventory`);
};

// Development / Testing
export const addTestItem = async (characterId: string, itemId: string, quantity: number = 1): Promise<void> => {
  await apiFetch(`/characters/${characterId}/inventory/items/${itemId}?quantity=${quantity}`, {
    method: 'POST',
  });
};

export const useItem = async (characterId: string, slotId: string): Promise<void> => {
  await apiFetch(`/characters/${characterId}/inventory/slots/${slotId}/use`, {
    method: 'POST',
  });
};
