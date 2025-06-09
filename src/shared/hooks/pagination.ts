export const usePagination = (data: any[]) => {
    return {
        data,
        count: data.length
    }
}