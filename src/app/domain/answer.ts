import { Task } from "./task";

export class Answer {
    readonly task!: Task;
    readonly answer!: number;
    readonly duration!: number; // seconds

    constructor (task: Task, answer: number, duration: number) {
        this.task = task;
        this.answer = answer;
        this.duration = duration;
    }

    public isCorrect(): boolean {
        return this.answer == this.task.result;
    }
}
