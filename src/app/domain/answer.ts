import { Task } from "./task";

export interface Answer {
    task: Task;
    answer: number;
    durationMilli: number;
}
