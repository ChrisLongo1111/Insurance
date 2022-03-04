import { Person } from "@features/quotes/models/person";

export interface Discount {
    calculate(person: Person, cost: number): number;
}