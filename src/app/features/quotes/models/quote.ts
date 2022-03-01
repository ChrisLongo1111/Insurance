import { Benefits } from "./benefits";
import { Employee } from "./employee";

export interface IQuote {
    id: number | undefined;
    employees: Array<Employee>;
}
export class Quote implements IQuote {
    public id: number | undefined;
    public employees: Array<Employee> = [];

    constructor(quote?: IQuote) {
        if (quote) {
            this.id = quote.id;
            quote.employees.forEach(employee => {
                this.employees.push(new Employee(employee));
            });
        }
    }

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