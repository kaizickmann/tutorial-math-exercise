import { Operation } from "./operation";

export interface TaskRange {
    operations: Operation[];
    lowerBoundary: number;
    higherBoundary: number;
}
