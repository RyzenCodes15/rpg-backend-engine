'use client';

import React, { useEffect, useState } from 'react';
import { craftingApi, RecipeResponse } from '@/lib/api/crafting';
import { getInventory, Inventory } from '@/lib/api/inventory';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { getItemIconPath } from '@/lib/itemUtils';

export default function CraftingPage({ params }: { params: { characterId: string } }) {
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [craftingMessage, setCraftingMessage] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [recipesData, invData] = await Promise.all([
        craftingApi.getAllRecipes(),
        getInventory(params.characterId)
      ]);
      setRecipes(recipesData);
      setInventory(invData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.characterId]);

  const handleCraft = async (recipeId: string) => {
    setCraftingMessage(null);
    try {
      const msg = await craftingApi.craftItem(params.characterId, recipeId);
      setCraftingMessage(msg);
      await fetchData(); // Refresh inventory
    } catch (err: any) {
      setCraftingMessage(err.message || 'Failed to craft item');
    }
  };

  const hasIngredients = (recipe: RecipeResponse) => {
    if (!inventory) return false;
    for (const req of recipe.ingredients) {
      const totalInInv = inventory.slots
        .filter((s) => s.item.id === req.materialItemId)
        .reduce((sum, s) => sum + s.quantity, 0);
      if (totalInInv < req.quantity) return false;
    }
    return true;
  };

  if (loading) return <div className="p-4 text-white font-pixel">Loading crafting...</div>;
  if (error) return <div className="p-4 text-red-500 font-pixel">{error}</div>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl text-white font-pixel mb-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Crafting</h1>
      
      {craftingMessage && (
        <div className="p-4 bg-gray-800 text-white font-pixel border-2 border-gray-600 rounded">
          {craftingMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => {
          const canCraft = hasIngredients(recipe);
          return (
            <Card key={recipe.id} className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative bg-rpg-surface border-2 border-rpg-border pixel-border shrink-0">
                    <Image src={getItemIconPath(recipe.craftedItemName)} alt={recipe.craftedItemName} fill className="object-contain pixelated p-1" />
                  </div>
                  <div>
                    <h2 className="text-lg text-rpg-primary font-bold drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                      {recipe.name} ({recipe.craftedItemName})
                    </h2>
                    <p className="text-sm text-gray-400">Lv {recipe.requiredLevel} Required</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleCraft(recipe.id)}
                  disabled={!canCraft}
                  variant="primary"
                  className={!canCraft ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Craft
                </Button>
              </div>
              
              <p className="text-sm text-gray-300">{recipe.description}</p>
              
              <div className="mt-2">
                <h3 className="text-xs text-gray-400 mb-1">Required Materials:</h3>
                <ul className="text-sm">
                  {recipe.ingredients.map((ing, idx) => {
                    const totalInInv = inventory?.slots
                      .filter((s) => s.item.id === ing.materialItemId)
                      .reduce((sum, s) => sum + s.quantity, 0) || 0;
                    
                    const hasEnough = totalInInv >= ing.quantity;

                    return (
                      <li key={idx} className="flex justify-between items-center border-b border-gray-700 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 relative bg-rpg-surface border border-rpg-border pixel-border shrink-0">
                            <Image src={getItemIconPath(ing.materialItemName)} alt={ing.materialItemName} fill className="object-contain pixelated p-0.5" />
                          </div>
                          <span className="text-gray-300">{ing.materialItemName}</span>
                        </div>
                        <span className={hasEnough ? 'text-green-400' : 'text-red-400'}>
                          {totalInInv} / {ing.quantity}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Card>
          );
        })}
        {recipes.length === 0 && (
          <div className="col-span-full text-gray-400 text-center py-8">
            No recipes available.
          </div>
        )}
      </div>
    </div>
  );
}
