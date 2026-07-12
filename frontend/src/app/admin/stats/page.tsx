'use client';

export default function AdminStats() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4">
        System Statistics & Combat Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-6">Combat Activity (Last 24h)</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-300">
              <span>Battles Fought</span>
              <span className="font-bold text-white">1,245</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Monsters Defeated</span>
              <span className="font-bold text-white">3,892</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Player Deaths</span>
              <span className="font-bold text-red-400">112</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Total Gold Dropped</span>
              <span className="font-bold text-yellow-400">45,900</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg">
          <h2 className="text-xl font-bold text-blue-400 mb-6">Economy & Trade</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-300">
              <span>Items Crafted</span>
              <span className="font-bold text-white">450</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Total Gold in Economy</span>
              <span className="font-bold text-yellow-400">8,230,500</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Active Players Online</span>
              <span className="font-bold text-green-400">87</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Server Load</span>
              <span className="font-bold text-green-400">Healthy (12%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
