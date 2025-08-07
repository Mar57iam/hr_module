import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useEmployees() {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();


  const getAllEm = async (filters = null) => {
    if (filters && (filters.status || filters.department || filters.position)) {
      return await getFilteredEmployees(filters);
    }

    const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/employees`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
  };

  const getEmployeeProfile = async (id) => {
    const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/employees/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch employee');
    return res.json();
  };

  const updateEmployee = async ({ id, updatedData }) => {
    const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/employees/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...updatedData,
        _method: 'put'
      }),
      
    });
    if (!res.ok) throw new Error('Failed to update employee');
    return res.json();
  };

  const updateMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(['employee']);
      queryClient.invalidateQueries(['employees']);
    },
  });

  const deleteEmployee = async (id) => {
    const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete employee');
    return res.json();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });

  const addEmployee = async (newEmployeeData) => {
    const res = await fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEmployeeData),
    });

    const result = await res.json();

    if (!res.ok) {
      console.log('Add Employee Response:', result);
      throw new Response(JSON.stringify(result), { status: res.status });
    }

    return result;
  };

  const addMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });

  const getFilteredEmployees = async (filters) => {
    const params = new URLSearchParams();

    if (filters.status) params.append('status', filters.status);
    if (filters.department) params.append('department', filters.department);
    if (filters.position) params.append('position', filters.position);

    const res = await fetch(
      `https://site46339-a7pcm8.scloudsite101.com/api/v1/search/employees?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch filtered employees');
    return res.json();
  };

  return {
    getAllEm,
    getEmployeeProfile,
    addEmployee,
    getFilteredEmployees,
    updateMutation,
    deleteMutation,
    addMutation,
  };
}







