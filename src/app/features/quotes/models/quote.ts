import { Benefits } from "./benefits";
import { Employee } from "./employee";

export class Quote {
    public employees: Array<Employee> = [];

    public calculate(): number {
        let quote = 0;
        this.employees.forEach(employee => {
            quote += Benefits.getEmployeeCost(employee);
        })
        return quote;
    }

    public calculateByEmployee(): Array<number> {
        const quoteByEmployee: Array<number> = [];
        this.employees.forEach(employee => {
            quoteByEmployee.push(Benefits.getEmployeeCost(employee));
        })
        return quoteByEmployee;
    }
}