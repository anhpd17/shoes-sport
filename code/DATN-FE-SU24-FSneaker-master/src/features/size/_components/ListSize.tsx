import { useSizeMutation } from '@/hooks/useSizeMutation'
import { useSizeQuery } from '@/hooks/useSizeQuery'
import { useEffect } from 'react'
import { getColumns } from './ColumnSize'
import { DataTable } from './DataTableSize'

const ListSize = () => {
    const { data, isLoading, isError, error } = useSizeQuery()

    useEffect(() => {
        if (data) {
            console.log('API data:', data)
        }
        if (error) {
            console.error('Error:', error)
        }
    }, [data, error])

    const { onRemove } = useSizeMutation({
        action: 'DELETE'
        // onSuccess: () => {
        //     toast.success('Xóa Size Thành Công')
        // }
    })

    if (isLoading) return <div>Loading ...</div>
    if (isError) return <div>Error ...</div>

    const columns = getColumns(onRemove)
    const tableData = data?.data || [] // Adjusted based on your response structure

    return <DataTable columns={columns} data={tableData} />
}

export default ListSize
