interface IBaseresponse{
    id: string,
    name: string
}

export interface IKnowledgeByTag{
    id: string,
    subject: string,
    category: IBaseresponse,
    folder: IBaseresponse,
    viewed: number,
    inserted: number,
    helped: number,
    notHelped: number,
    paging: {
        totalPage: number,
        totalItems: number,
        currentPage: number,
        itemPerPage: number,
    }
}