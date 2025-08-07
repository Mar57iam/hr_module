import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/Context/AuthContext';

export default function useProfile() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/employee/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch profile');
      }

      const result = await res.json();
      return result.profile;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const updatePersonalInfo = useMutation({
    mutationFn: async ({ id, formData }) => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/employee/profile/personal/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    },
    onError: (error) => {
      console.error('Update error:', error.message);
    },
  });

  return {
    profile: data,
    isLoading,
    isError,
    error,
    updatePersonalInfo,
  };
}

