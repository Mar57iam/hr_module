import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDepartments(departmentId) {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

 
  const { data: departments, isLoading, isError } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const res = await fetch('https://site46339-a7pcm8.scloudsite101.com/api/v1/departments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const allDep = await res.json();
      return allDep.departments;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  
  const addDepartment = useMutation({
    mutationFn: async (newDepartment) => {
      const res = await fetch('https://site46339-a7pcm8.scloudsite101.com/api/v1/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDepartment),
      });
      if (!res.ok) throw new Error('Failed to add department');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['departments']);
    },
  });

  
  const updateDepartment = useMutation({
    mutationFn: async (updatedDep) => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/departments/${updatedDep.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDep),
      });
      if (!res.ok) throw ('Failed to update department');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['departments']);
    },
  });

  
  const deleteDepartment = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/departments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete department');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['departments']);
    },
  });

  
  const { data: departmentDetails, isLoading: isDepartmentLoading } = useQuery({
    queryKey: ['department', departmentId],
    queryFn: async () => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/departments/${departmentId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch department details');
      return res.json();
    },
    enabled: !!departmentId, 
  });

  
  const { data: employeesData, isLoading: isEmployeesLoading } = useQuery({
    queryKey: ['employeesInDepartment', departmentId],
    queryFn: async () => {
      const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/departments/${departmentId}/employees`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch employees in department');
      return res.json();
    },
    enabled: !!departmentId,
  });

  

  return {
    departments,
    isLoading,
    isError,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    departmentDetails: departmentDetails?.department,
    employees: employeesData?.employees,
    isDepartmentLoading,
    isEmployeesLoading,

  };
}




  

 

