import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/Context/AuthContext';

const API_BASE = 'https://site46339-a7pcm8.scloudsite101.com/';

export default function useProfile() {
  const { token } = useContext(AuthContext);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}api/employee/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }

      const result = await res.json();
      return result.profile;
    },
  });

  return {
    profile: data,
    isLoading,
    isError,
    error,
  };
}
