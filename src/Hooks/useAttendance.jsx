import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/Context/AuthContext';

export default function useAttendance() {
  const { token } = useContext(AuthContext);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['attendanceReports'],
    queryFn: async () => {
      const res = await fetch('https://site46339-a7pcm8.scloudsite101.com/api/v1/show-attendance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const finalReports = await res.json();
      return finalReports;
    },
    // enabled: !!token,
  });

  return { data, isLoading, isError };
}
