import { environment } from "environments/environment";
import { Dependent, IDependent } from "./dependent";
import { IPerson, Person } from "./person";

export interface IEmployee extends IPerson {
    dependents: Array<IDependent>;
}

export class Employee extends Person {
    constructor(employee?: IEmployee) {
        super(employee);
        if (employee) {
            employee.dependents.forEach(dependent => {
                this.dependents.push(new Dependent(dependent));
            })
        }
    }

    public dependents: Array<Dependent> = [];
    public income: number = environment.employeeIncome * environment.paychecks;
}