export interface DataResponse<T> {
    data: T;
}
export interface RulesResponse {
    data: DataInterface[];
    meta: MetaInterface;
}
export interface DataInterface {
    id: string;
    value: string;
}


export interface MetaInterface {
    sent: string;
    result_count: number;
}
