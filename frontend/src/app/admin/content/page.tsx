'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

// Types
interface Item { id?: string; name: string; description: string; rarity: string; category: string; value: number; requiredLevel: number; }
interface Monster { id?: string; name: string; description: string; level: number; health: number; attack: number; defense: number; speed: number; goldReward: number; experienceReward: number; }
interface Skill { id?: string; name: string; description: string; classRestriction: string; requiredLevel: number; manaCost: number; }
interface Recipe { id?: string; name: string; description: string; craftedItemId: string; requiredLevel: number; }

type TabType = 'ITEMS' | 'MONSTERS' | 'SKILLS' | 'RECIPES';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState<TabType>('ITEMS');
  
  const [items, setItems] = useState<Item[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'ITEMS') {
        const data = await apiFetch('/admin/items');
        setItems(data || []);
      } else if (activeTab === 'MONSTERS') {
        const data = await apiFetch('/admin/monsters');
        setMonsters(data || []);
      } else if (activeTab === 'SKILLS') {
        const data = await apiFetch('/admin/skills');
        setSkills(data || []);
      } else if (activeTab === 'RECIPES') {
        const data = await apiFetch('/admin/recipes');
        setRecipes(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
      await apiFetch(`/admin/${activeTab.toLowerCase()}/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      alert('Failed to delete.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editEntity ? `/admin/${activeTab.toLowerCase()}/${editEntity.id}` : `/admin/${activeTab.toLowerCase()}`;
      const method = editEntity ? 'PUT' : 'POST';
      await apiFetch(url, {
        method,
        body: JSON.stringify(formData),
      });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert('Failed to save.');
    }
  };

  const openAddModal = () => {
    setEditEntity(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const openEditModal = (entity: any) => {
    setEditEntity(entity);
    setFormData(entity);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const tabs = [
    { id: 'ITEMS', label: 'Items' },
    { id: 'MONSTERS', label: 'Monsters' },
    { id: 'SKILLS', label: 'Skills' },
    { id: 'RECIPES', label: 'Recipes' }
  ] as const;

  return (
    <div>
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Content Management</h1>
        <Button variant="primary" onClick={openAddModal}>
          Add New {activeTab.charAt(0) + activeTab.slice(1).toLowerCase()}
        </Button>
      </div>

      <div className="flex space-x-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-t-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white border-b-2 border-purple-400'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 rounded-b-xl rounded-tr-xl shadow-lg border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading {activeTab.toLowerCase()}...</div>
        ) : (
          <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-950 border-b border-gray-800 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {(activeTab === 'ITEMS' ? items : activeTab === 'MONSTERS' ? monsters : activeTab === 'SKILLS' ? skills : recipes).length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500 font-medium">
                    No {activeTab.toLowerCase()} found.
                  </td>
                </tr>
              ) : (
                (activeTab === 'ITEMS' ? items : activeTab === 'MONSTERS' ? monsters : activeTab === 'SKILLS' ? skills : recipes).map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{item.name}</td>
                    <td className="px-6 py-4 text-sm truncate max-w-xs text-gray-400">{item.description}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button onClick={() => openEditModal(item)} className="text-blue-400 hover:text-blue-300 text-sm font-medium">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editEntity ? `Edit ${activeTab}` : `Add ${activeTab}`}>
        <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input required type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea required name="description" value={formData.description || ''} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" />
          </div>

          {activeTab === 'ITEMS' && (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Rarity</label>
                <select required name="rarity" value={formData.rarity || 'COMMON'} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white">
                  <option value="COMMON">Common</option>
                  <option value="UNCOMMON">Uncommon</option>
                  <option value="RARE">Rare</option>
                  <option value="EPIC">Epic</option>
                  <option value="LEGENDARY">Legendary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <select required name="category" value={formData.category || 'CONSUMABLE'} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white">
                  <option value="WEAPON">Weapon</option>
                  <option value="ARMOR">Armor</option>
                  <option value="HELMET">Helmet</option>
                  <option value="BOOTS">Boots</option>
                  <option value="CONSUMABLE">Consumable</option>
                  <option value="MATERIAL">Material</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Value</label>
                <input required type="number" name="value" value={formData.value || 0} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Required Level</label>
                <input required type="number" name="requiredLevel" value={formData.requiredLevel || 1} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" />
              </div>
            </>
          )}

          {activeTab === 'MONSTERS' && (
            <>
              <div><label className="block text-sm text-gray-400 mb-1">Level</label><input required type="number" name="level" value={formData.level || 1} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Health</label><input required type="number" name="health" value={formData.health || 10} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Attack</label><input required type="number" name="attack" value={formData.attack || 5} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Defense</label><input required type="number" name="defense" value={formData.defense || 5} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Speed</label><input required type="number" name="speed" value={formData.speed || 10} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Gold Reward</label><input required type="number" name="goldReward" value={formData.goldReward || 0} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Exp Reward</label><input required type="number" name="experienceReward" value={formData.experienceReward || 0} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
            </>
          )}

          {activeTab === 'SKILLS' && (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Class Restriction</label>
                <select required name="classRestriction" value={formData.classRestriction || 'NONE'} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white">
                  <option value="NONE">None</option>
                  <option value="WARRIOR">Warrior</option>
                  <option value="MAGE">Mage</option>
                  <option value="ROGUE">Rogue</option>
                </select>
              </div>
              <div><label className="block text-sm text-gray-400 mb-1">Required Level</label><input required type="number" name="requiredLevel" value={formData.requiredLevel || 1} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Mana Cost</label><input required type="number" name="manaCost" value={formData.manaCost || 0} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
            </>
          )}

          {activeTab === 'RECIPES' && (
            <>
              <div><label className="block text-sm text-gray-400 mb-1">Crafted Item ID (UUID)</label><input required type="text" name="craftedItemId" value={formData.craftedItemId || ''} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Required Level</label><input required type="number" name="requiredLevel" value={formData.requiredLevel || 1} onChange={handleChange} className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white" /></div>
            </>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save {activeTab}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
