


import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/Context/AuthContext';

export default function useAttendance() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/attendance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw ('Failed to clock in');
      }
  
      return res.json();
    },
    onSuccess: () => {
      toast.success('Clock in successful!');
      queryClient.invalidateQueries(['attendance']);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  
  return mutation;
}
