import { apiFetch } from '../api';

export interface RecipeIngredientResponse {
  materialItemId: string;
  materialItemName: string;
  quantity: number;
}

export interface RecipeResponse {
  id: string;
  name: string;
  description: string;
  craftedItemId: string;
  craftedItemName: string;
  requiredLevel: number;
  ingredients: RecipeIngredientResponse[];
}

export const craftingApi = {
  getAllRecipes: async (): Promise<RecipeResponse[]> => {
    return apiFetch(`/crafting/recipes`);
  },

  craftItem: async (characterId: string, recipeId: string): Promise<string> => {
    return apiFetch(`/crafting/${characterId}/craft/${recipeId}`, { method: 'POST', textResponse: true });
  }
};
