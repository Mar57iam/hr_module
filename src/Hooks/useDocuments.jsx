import { AuthContext } from '@/Context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

export default function useDocuments() {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

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

  const deleteDocument = async (documentId) => {
    const res = await fetch(
      `https://site46339-a7pcm8.scloudsite101.com/api/v1/documents/${documentId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to delete document');
    }

    return res.json();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries(['documents']);
    },
  });

  const {
    data: documents,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });

  return {
    documents,
    isLoading,
    isError,
    deleteDocument: deleteMutation.mutate,
    isDeleting: deleteMutation.isLoading,
    deleteError: deleteMutation.error,
  };
}