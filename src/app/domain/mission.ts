import { Answer } from "./answer";
import { TaskRange } from "./task-range";

export interface Mission {
    taskCount: number;
    taskRange: TaskRange;
    answers: Answer[];
}
