'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { craftingApi, RecipeResponse } from '@/lib/api/crafting';
import { getInventory, Inventory } from '@/lib/api/inventory';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CraftingPage({ params }: { params: { characterId: string } }) {
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [craftingMessage, setCraftingMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [recipesData, invData] = await Promise.all([
        craftingApi.getAllRecipes(),
        getInventory(params.characterId)
      ]);
      setRecipes(recipesData);
      setInventory(invData);
    } catch (err: any) {
      setError(err.message || 'Failed to load crafting data');
    } finally {
      setLoading(false);
    }
  }, [params.characterId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-rpg-surface border-4 border-rpg-border pixel-border animate-pulse">
        <span className="text-xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Opening Crafting Ledger...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-950/80 border-4 border-red-500 text-white font-pixel pixel-border drop-shadow-md">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Ledger Header */}
      <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }}></div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
          <div>
            <h1 className="text-3xl font-pixel text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-wide">
              Crafting Ledger
            </h1>
            <p className="text-sm font-retro text-rpg-text mt-1 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
              Combine raw materials and rare reagents to forge equipment and consumables.
            </p>
          </div>
          <div className="bg-rpg-bg px-4 py-3 border-2 border-rpg-border pixel-border">
            <span className="text-xs font-retro text-gray-400 uppercase tracking-wider block">Known Recipes:</span>
            <span className="text-xl font-pixel text-rpg-primary drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
              {recipes.length} <span className="text-gray-500 text-sm">Registered</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Status Message */}
      {craftingMessage && (
        <div className="p-4 bg-rpg-bg border-4 border-rpg-primary text-white font-pixel pixel-border drop-shadow-md flex items-center justify-between">
          <span>{craftingMessage}</span>
          <button onClick={() => setCraftingMessage(null)} className="text-xs text-gray-400 hover:text-white font-retro">
            [Dismiss]
          </button>
        </div>
      )}

      {/* Text-Based Ledger Table / Cards */}
      <div className="flex flex-col gap-5">
        {recipes.map((recipe) => {
          const canCraft = hasIngredients(recipe);
          return (
            <Card key={recipe.id} className={`p-6 flex flex-col gap-5 border-4 pixel-border transition-all duration-200 ${canCraft ? 'border-rpg-border bg-rpg-surface hover:border-rpg-primary/80' : 'border-gray-700 bg-gray-900/60 opacity-75'}`}>
              {/* Recipe Title & Craft Action Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-white/10 pb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl text-white font-pixel drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] tracking-wide">
                      {recipe.name}
                    </h2>
                    <span className="text-xs font-retro uppercase bg-black/60 text-rpg-primary px-2.5 py-1 border border-white/15">
                      Output: {recipe.craftedItemName}
                    </span>
                    <span className="text-xs font-retro uppercase bg-gray-800 text-gray-300 px-2.5 py-1 border border-gray-600">
                      Req. Lv {recipe.requiredLevel}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 font-sans mt-1">
                    {recipe.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 self-start md:self-center">
                  <div className="text-right hidden sm:block">
                    <span className={`text-xs font-retro uppercase block ${canCraft ? 'text-green-400' : 'text-red-400'}`}>
                      {canCraft ? 'Ready to Forge' : 'Missing Materials'}
                    </span>
                  </div>
                  <Button 
                    onClick={() => handleCraft(recipe.id)}
                    disabled={!canCraft}
                    variant="primary"
                    className={`px-6 py-3 font-pixel text-sm uppercase tracking-wider ${!canCraft ? 'opacity-40 cursor-not-allowed grayscale' : 'hover:scale-105 transition-transform'}`}
                  >
                    Craft Item
                  </Button>
                </div>
              </div>

              {/* Ledger Requirements Table */}
              <div className="bg-black/30 border border-white/10 p-4">
                <div className="text-xs font-retro text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b border-white/10 flex justify-between">
                  <span>Required Material Specification</span>
                  <span>Inventory / Required</span>
                </div>
                
                <div className="flex flex-col gap-2.5">
                  {recipe.ingredients.map((ing, idx) => {
                    const totalInInv = inventory?.slots
                      .filter((s) => s.item.id === ing.materialItemId)
                      .reduce((sum, s) => sum + s.quantity, 0) || 0;
                    
                    const hasEnough = totalInInv >= ing.quantity;

                    return (
                      <div key={idx} className="flex justify-between items-center text-sm font-sans py-1.5 px-3 bg-rpg-bg/60 border border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-rpg-primary inline-block shrink-0"></span>
                          <span className="font-semibold text-gray-200 tracking-wide">{ing.materialItemName}</span>
                        </div>
                        
                        <div className="font-retro text-sm flex items-center gap-2">
                          <span className={`px-2 py-0.5 border ${hasEnough ? 'text-green-300 bg-green-950/80 border-green-500/60' : 'text-red-300 bg-red-950/80 border-red-500/60'}`}>
                            {totalInInv} / {ing.quantity}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })}

        {recipes.length === 0 && (
          <div className="bg-rpg-surface border-4 border-rpg-border p-12 text-center text-gray-400 font-pixel pixel-border">
            No crafting blueprints registered in the ledger.
          </div>
        )}
      </div>
    </div>
  );
}
