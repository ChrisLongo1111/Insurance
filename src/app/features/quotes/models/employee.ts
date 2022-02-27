import { environment } from "environments/environment";
import { Dependent } from "./dependent";
import { Person } from "./person";

export class Employee extends Person {
    public dependents: Array<Dependent> = [];
    public income: number = environment.employeeIncome * environment.paychecks;
}