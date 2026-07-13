'use client';

import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [newRole, setNewRole] = useState('PLAYER');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/admin/users?page=${page}&size=10`);
      setUsers(res.content || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleStatus = async (user: User) => {
    try {
      await apiFetch(`/admin/users/${user.id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ enabled: !user.enabled }),
      });
      fetchUsers();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const updateRole = async () => {
    if (!selectedUser) return;
    try {
      await apiFetch(`/admin/users/${selectedUser.id}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole }),
      });
      setIsRoleModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role.replace('ROLE_', ''));
    setIsRoleModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading users...</div>
        ) : (
          <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-950 border-b border-gray-800 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Username</th>
                <th className="px-6 py-4 font-medium tracking-wider">Email</th>
                <th className="px-6 py-4 font-medium tracking-wider">Role</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider">Created</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 font-medium">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        user.role === 'ROLE_ADMIN' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {user.role.replace('ROLE_', '')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        user.enabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.enabled ? 'Active' : 'Banned'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => openRoleModal(user)}
                        className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                      >
                        Change Role
                      </button>
                      <button 
                        onClick={() => toggleStatus(user)}
                        className={`${user.enabled ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'} transition-colors text-sm font-medium`}
                      >
                        {user.enabled ? 'Ban' : 'Unban'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button 
          variant="secondary" 
          disabled={page === 0 || loading}
          onClick={() => setPage(p => p - 1)}
        >
          Previous
        </Button>
        <span className="text-gray-400 text-sm">
          Page {page + 1} of {totalPages}
        </span>
        <Button 
          variant="secondary" 
          disabled={page >= totalPages - 1 || loading}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </Button>
      </div>

      <Modal 
        isOpen={isRoleModalOpen} 
        onClose={() => setIsRoleModalOpen(false)}
        title="Change User Role"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Select a new role for <span className="font-bold text-white">{selectedUser?.username}</span>:
          </p>
          <select 
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="PLAYER">Player</option>
            <option value="ADMIN">Admin</option>
          </select>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="secondary" onClick={() => setIsRoleModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={updateRole}>Save Role</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
