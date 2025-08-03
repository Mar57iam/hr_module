import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function usePositions() {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Get All Positions
  const { data: positions, isLoading, isError } = useQuery({
    queryKey: ['positions'],
    queryFn: async () => {
      const res = await fetch('https://site46339-a7pcm8.scloudsite101.com/api/v1/positions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data.positions;
    },
  });

  // ✅ Add Position
  const addPosition = useMutation({
    mutationFn: async (newPosition) => {
      const res = await fetch('https://site46339-a7pcm8.scloudsite101.com/api/v1/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPosition),
      });
      if (!res.ok) throw new Error('Failed to add');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['positions']);
    },
  });

  // ✅ Update Position
  const updatePosition = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/positions/${id}`, {
        method: 'PUT', // أو PATCH لو الـ API يستخدم PATCH
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['positions']);
    },
  });

  // ✅ Delete Position
  const deletePosition = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/positions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['positions']);
    },
  });

  return {
    positions,
    isLoading,
    isError,
    addPosition,
    updatePosition,
    deletePosition,
  };
}
