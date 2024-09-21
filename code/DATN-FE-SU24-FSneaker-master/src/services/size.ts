import { ISize } from '@/common/type'
import { Modal } from 'antd'
import instance from '../core/api'
import { toast } from 'react-toastify'

const showModal = (title: string, content: string) => {
    Modal.info({
        title: title,
        content: content,
        className: 'btn btn-primary',
        onOk() {},
        okButtonProps: {
            className: 'bg-sky-400'
        }
    })
}
export const getSizes = async () => {
    try {
        const response = await instance.get('/api/size')
        return response.data
    } catch (error) {
        console.log(`['FETCHS_SIZES_ERROR']`, error)
    }
}

export const getSize = async (_id: string) => {
    try {
        const response = await instance.get(`/api/size/${_id}`)
        return response.data.data
    } catch (error) {
        console.log(`['FETCHS_SIZE_ERROR']`, error)
    }
}

export const addSize = async (size: ISize) => {
    try {
        const response = await instance.post('/api/size', size)
        if (response.status === 200) {
            toast.success('Thêm thành công')
        }
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 500) {
            toast.error('Kích thước đã tồn tại!')
        } else {
            console.log(`['ADD_SIZE_ERROR']`, error)
        }
    }
}

export const updateSize = async ({ _id, size, slug, ...sizes }: ISize) => {
    console.log('data size: ', size)
    try {
        const response = await instance.put(`/api/size/${_id}`, { size, slug })

        return response.data
    } catch (error) {
        console.log(`['UPDATE_SIZE_ERROR']`, error)
    }
}

export const deleteSize = async (size: ISize) => {
    try {
        const response = await instance.delete(`/api/size/${size._id}`)
        if (response.status === 200) {
            toast.success('Xóa size thành công')
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // toast.error('Kích thước không thể xóa!')
            showModal('Lỗi', 'Kích thước không thể xóa vì có sản phẩm liên quan!')
        } else {
            console.log(`['DELETE_SIZE_ERROR']`, error)
        }
    }
}
