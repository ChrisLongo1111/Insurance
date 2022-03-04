import { IPerson, Person } from "@features/quotes/models/person";

export interface IDependent extends IPerson {
}

export class Dependent extends Person {
    constructor(dependent?: IDependent) {
        super(dependent);
    }
}