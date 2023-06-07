import { Answer } from "./answer";
import { Summary } from "./summary";
import { TaskRange } from "./task-range";

export class Mission {
    readonly taskCount!: number;
    readonly taskRange!: TaskRange;
    readonly answers!: Answer[];

    private summary?: Summary;

    constructor(taskCount: number, taskRange: TaskRange) {
        this.taskCount = taskCount;
        this.taskRange = taskRange;
        this.answers = [];
    }

    public getSummary(): Summary {
        if (!this.summary) {
            this.summary = this.calculateSummary();
        }
        return this.summary;
    }

    private calculateSummary(): Summary {
        let sumCorrect: number = 0;
        let sumDuration: number = 0;
        for (var answer of this.answers) {
            if (answer.isCorrect()) {
                sumCorrect++;
            }
            sumDuration += answer.duration;
        }
        return {
            count: this.answers.length,
            percentage: Math.round(100 * sumCorrect / this.answers.length),
            totalDuration: sumDuration,
        }
    }
}
