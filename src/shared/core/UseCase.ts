
export interface IUseCase<IRequest, IResponse> {
    run(request: IRequest): Promise<IResponse>;
}
