import { Operation } from "./operation";

export interface TaskCategory {
    operation: Operation;
    lowerBoundary: number;
    higherBoundary: number;
}
