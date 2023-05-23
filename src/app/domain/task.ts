import { Operation } from "./operation";

export interface Task {
    operation: Operation;
    operand1: number;
    operand2: number;
    result: number;
}
