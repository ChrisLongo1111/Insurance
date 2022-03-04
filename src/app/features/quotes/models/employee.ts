import { environment } from "environments/environment";
import { Dependent, IDependent } from "@features/quotes/models/dependent";
import { IPerson, Person } from "@features/quotes/models/person";

export interface IEmployee extends IPerson {
    dependents: Array<IDependent>;
}

export class Employee extends Person {
    constructor(employee?: IEmployee) {
        super(employee);
        if (employee) {
            this.dependents = employee.dependents?.map(dependent => new Dependent(dependent))
        }
    }

    public dependents: Array<Dependent> = [];
    public income: number = environment.employeeIncome * environment.paychecks;
}