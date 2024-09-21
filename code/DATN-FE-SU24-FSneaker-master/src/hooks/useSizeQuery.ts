import { getSize, getSizes } from '@/services/size';
import { useQuery } from 'react-query';

export const useSizeQuery = (sizeId?: string) => {
    const { data, error, ...rest } = useQuery({
        
        
        queryKey: sizeId ? ['SIZE', sizeId] : ['SIZE'],
        queryFn: () => (sizeId ? getSize(sizeId) : getSizes()),
        refetchOnReconnect: true,
        onError: (err) => {
            console.error('Error fetching size data:', err);
        },
    });
    return { data, error, ...rest };
};
