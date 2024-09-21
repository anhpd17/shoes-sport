import { useCategoryMutation } from '@/hooks/useAdmCategoryMutation'
import { useCategoryQuery } from '@/hooks/useAdmCategoryQuery.ts'
import { useEffect } from 'react'
import { getColumns } from './ColumnCategory'
import { DataTable } from './DataTableCategory'

const ListCategory = () => {
    const { data, isLoading, isError, error } = useCategoryQuery()

    useEffect(() => {
        if (data) {
            console.log('API data:', data)
        }
        if (error) {
            console.error('Error:', error)
        }
    }, [data, error])

    const { onRemove } = useCategoryMutation({
        action: 'DELETE',
        onSuccess: () => {
            // toast.success('Xóa Thương Hiệu Thành Công')
        }
    })

    if (isLoading) return <div>Loading ...</div>
    if (isError) return <div>Error ...</div>

    const columns = getColumns(onRemove)
    const tableData = data?.data || [] // Adjusted based on your response structure

    return <DataTable columns={columns} data={tableData} />
}

export default ListCategory
