import { Item } from './api/inventory';

export const getItemIconPath = (itemOrName: Item | string | null): string => {
  return ''; // Deprecated: we use Lucide icons exclusively now
};

export const getItemCategoryFallback = (itemOrName: Item | string | null): string => {
  if (!itemOrName) return 'misc';
  
  const isString = typeof itemOrName === 'string';
  const name = isString ? itemOrName : itemOrName.name;
  const nameKey = name.toLowerCase().replace(/ /g, '_');
  
  if (!isString) {
    switch (itemOrName.category) {
      case 'WEAPON': return 'weapon';
      case 'HELMET':
      case 'ARMOR':
      case 'BOOTS': return 'armor';
      case 'CONSUMABLE': return 'consumable';
      case 'MATERIAL': return 'material';
    }
  } else {
    if (nameKey.includes('sword') || nameKey.includes('axe') || nameKey.includes('bow') || nameKey.includes('staff') || nameKey.includes('blade')) return 'weapon';
    if (nameKey.includes('armor') || nameKey.includes('tunic') || nameKey.includes('helmet') || nameKey.includes('shield') || nameKey.includes('boots')) return 'armor';
    if (nameKey.includes('potion') || nameKey.includes('flask') || nameKey.includes('elixir')) return 'consumable';
    if (nameKey.includes('scroll') || nameKey.includes('tome')) return 'scroll';
    if (['goblin_jelly', 'goblin_tooth', 'bone', 'slime_core', 'pelt'].some(kw => nameKey.includes(kw)) || nameKey.includes('ore') || nameKey.includes('ingot')) return 'material';
  }
  
  return 'misc';
};
