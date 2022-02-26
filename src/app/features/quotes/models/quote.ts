import { Benefits } from "./benefits";
import { Employee } from "./employee";

export class Quote {
    public employees: Array<Employee> = [];

    public calculate(): number {
        let quote = 0;
        this.employees.forEach(employee => {
            quote += Benefits.getCost(employee);
            employee.dependents.forEach(dependent => {
                quote += Benefits.getCost(dependent);
            })
        })
        return quote;
    }
}