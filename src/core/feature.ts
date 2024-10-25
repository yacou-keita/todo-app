export interface Feature<ReturnType, Params> {
    execute(params: Params): Promise<ReturnType>
}

export class NoPrams { }