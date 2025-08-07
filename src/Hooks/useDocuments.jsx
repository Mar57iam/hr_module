
import { AuthContext } from '@/Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';


export default function useDocuments() {
  const { token } = useContext(AuthContext);

  const getDocuments = async () => {
    const res = await fetch(
      'https://site46339-a7pcm8.scloudsite101.com/api/v1/documents',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const finaldoc = await res.json();
    return finaldoc.documents; 
  };

  const {
    data: documents, isLoading,isError,} = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });

  return { documents, isLoading, isError };
}
