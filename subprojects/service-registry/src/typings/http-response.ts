
export interface IHttpResponse {
    statusCode: number,
    cookie?: string,
    body: any
    headers?: any,
    Location?: any,
}