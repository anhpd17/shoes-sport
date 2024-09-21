import { IProduct } from '@/common/interfaces/product'
import { getInfoProduct } from '@/services/infoProduct'
import { getProducts } from '@/services/product'
import { useEffect, useState } from 'react'
import { IInfoProduct } from '../common/interfaces/infoProduct'

import { pick } from 'lodash'

type IInnfoProductNew = Pick<IInfoProduct, 'nameCategory' | 'images' | 'productDetails'>

export interface IProductAdvanced extends IProduct, IInnfoProductNew {}

export const useGetProducts = (query: { limit: number }) => {
    const [data, setData] = useState<IProductAdvanced[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await getProducts({ _page: currentPage, _limit: query?.limit, _sort: 'createdAt' })
            const products: IProduct[] = response?.datas?.docs

            const count: number = response?.datas?.totalDocs

            count && setTotalCount(count)

            if (products?.length !== 0) {
                const productIds = products?.map((item) => item._id)

                const promises = await Promise.allSettled(productIds.map((productId) => getInfoProduct(productId)))

                const results = promises?.map((result, index) => {
                    if (result.status === 'fulfilled') {
                        const obj: IInfoProduct = result?.value?.data
                        const pickObj: IInnfoProductNew = pick(obj, ['nameCategory', 'images', 'productDetails'])

                        return {
                            ...products[index],
                            ...pickObj
                        }
                    }
                    return products[index]
                }) as IProductAdvanced[]

                setData(results)
                setIsLoading(false)
            }
        } catch (error) {
            setCurrentPage(1)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [currentPage])

    return {
        data,
        currentPage,
        setCurrentPage,
        totalCount,
        isLoading,
        fetchData
    }
}
