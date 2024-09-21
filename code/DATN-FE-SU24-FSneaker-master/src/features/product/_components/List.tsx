import { useProductQuery } from '@/hooks/useProductQuery'
import { useToast } from '../../../components/ui/use-toast'
import { useProductMutation } from '@/hooks/useProductMutation'

import { getColumns } from './Column'
import { DataTable } from './DataTable'

const List = () => {
    const { toast } = useToast()
    const { data, isLoading, isError } = useProductQuery()
    const { onRemove } = useProductMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Chuc mung ban',
                description: 'San pham xoa thanh cong'
            })
        }
    })
    if (isLoading) return <div>Loading ...</div>
    if (isError) return <div>Error ...</div>
    const columns = getColumns(onRemove)
    return <DataTable columns={columns} data={data} />
}
export default List
