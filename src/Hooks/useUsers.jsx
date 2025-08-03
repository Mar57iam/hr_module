'use client';

import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUsers() {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Get all users
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://site46339-a7pcm8.scloudsite101.com/api/v1/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const alluser = await res.json();
      return alluser.users;
    },
  });

  // Add user
  const addUser = useMutation({
    mutationFn: async (newUser) => {
      const res = await fetch('https://site46339-a7pcm8.scloudsite101.com/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const error = await res.json();
        throw error;
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  // Update user
  const updateUser = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw error;
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  // ✅ Delete user
  const deleteUser = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw error;
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  return {
    users,
    isLoading,
    isError,
    addUser,
    updateUser,
    deleteUser,
  };
}
