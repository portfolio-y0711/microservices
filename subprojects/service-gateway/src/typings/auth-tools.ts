
export interface IAuthTools {
    authenticate: ({ saved, input }: { saved: string, input: string }) => Promise<boolean>,
    tokenizer: any,
    cookieCreator: any,
}

export interface IVerificationResponse {
  expriresIn: number, 
  token: string    
}
