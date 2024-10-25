import { Feature, NoPrams } from "../../../../../core/feature";
import { ITaskRepository } from "../../repositories/task.repository";

export class CountStartingTask implements Feature<number, NoPrams> {
    constructor(private readonly repository: ITaskRepository) { }
    
    async execute(): Promise<number> {
        return await this.repository.countStarting()
    }
}