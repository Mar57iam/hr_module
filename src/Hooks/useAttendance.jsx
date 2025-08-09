import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/Context/AuthContext';

export default function useAttendance() {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

 
  const attendanceReports = useQuery({
    queryKey: ['attendanceReports'],
    queryFn: async () => {
      const res = await fetch('https://site46339-a7pcm8.scloudsite101.com/api/v1/show-attendance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
  });

  
  const pendingReports = useQuery({
    queryKey: ['pendingReports'],
    queryFn: async () => {
      const res = await fetch('https://site46339-a7pcm8.scloudsite101.com/api/v1/show-pending-records', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
  });

 
  

  return { attendanceReports, pendingReports,  };
}
