import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {

    const {user, loading} = useAuth();

    const axios = useAxiosSecure();

    const {isLoading, data: role} = useQuery({
        queryKey: ['user-role',user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axios.get(`/users/${user?.email}/role`);
            return res.data?.role || 'user';
        }
    })


    return {role, isLoading: isLoading || loading};
};

export default useRole;