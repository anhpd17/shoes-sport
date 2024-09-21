export type ISort = 'asc' | 'desc' | 'createdAt'

export type IRole = 'admin' | 'user'

export interface IQueryParams {
    _page?: number
    _limit?: number
    _sort?: ISort
}

export interface IListResponse<T> {
    message: string
    datas: {
        docs: T[]
    } & IListParams
}

export interface IListParams {
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number
    nextPage: number
}

export type IImageType = 'thumbnail' | 'gallery'
