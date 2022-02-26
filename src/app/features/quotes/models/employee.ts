import { Dependent } from "./dependent";
import { Person } from "./person";

export class Employee extends Person {
    public dependents: Array<Dependent> = [];
}