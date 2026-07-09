import { Item } from './api/inventory';

export const getItemIconPath = (itemOrName: Item | string | null): string => {
  if (!itemOrName) return '/assets/items/placeholders/weapon.png'; // default fallback

  const isString = typeof itemOrName === 'string';
  const name = isString ? itemOrName : itemOrName.name;
  const nameKey = name.toLowerCase().replace(/ /g, '_');
  
  // Try to determine category from object, otherwise infer from name for strings
  let categoryFolder = 'misc';
  if (!isString) {
    switch (itemOrName.category) {
      case 'WEAPON': categoryFolder = 'weapons'; break;
      case 'HELMET':
      case 'CHEST_ARMOR':
      case 'GLOVES':
      case 'BOOTS': categoryFolder = 'armor'; break;
      case 'CONSUMABLE': categoryFolder = 'consumables'; break;
      case 'MATERIAL': categoryFolder = 'materials'; break;
      case 'QUEST_ITEM': categoryFolder = 'quest'; break;
    }
  } else {
    // Infer category for known items
    if (nameKey === 'wooden_sword') categoryFolder = 'weapons';
    else if (nameKey === 'leather_tunic') categoryFolder = 'armor';
    else if (nameKey === 'minor_health_potion') categoryFolder = 'consumables';
    else if (['goblin_ear', 'bone_fragment', 'slime_jelly', 'wolf_pelt'].includes(nameKey)) categoryFolder = 'materials';
  }

  // Use the specific generated/SVG asset based on item name key
  const availableAssets = [
    'wooden_sword',
    'leather_tunic',
    'minor_health_potion',
  ];
  const availableSvgs = [
    'goblin_ear',
    'bone_fragment',
    'slime_jelly',
    'wolf_pelt'
  ];

  if (availableAssets.includes(nameKey)) {
    return `/assets/items/${categoryFolder}/${nameKey}.png`;
  } else if (availableSvgs.includes(nameKey)) {
    return `/assets/items/${categoryFolder}/${nameKey}.svg`;
  }

  // Fallback to placeholder by category if specific icon is missing
  if (!isString) {
    switch (itemOrName.category) {
      case 'WEAPON': return '/assets/items/placeholders/weapon.png';
      case 'HELMET': return '/assets/items/placeholders/helmet.png';
      case 'CHEST_ARMOR': return '/assets/items/placeholders/chest_armor.png';
      case 'GLOVES': return '/assets/items/placeholders/gloves.png';
      case 'BOOTS': return '/assets/items/placeholders/boots.png';
      case 'CONSUMABLE': return '/assets/items/placeholders/consumable.png';
    }
  }
  return '/assets/items/placeholders/weapon.png';
};
