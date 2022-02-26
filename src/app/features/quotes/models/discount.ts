import { Person } from "./person";

export interface Discount {
    calculate(person: Person, cost: number): number;
}