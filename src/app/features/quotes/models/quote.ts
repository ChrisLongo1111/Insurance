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
            this.employees = quote.employees.map(employee => new Employee(employee));
        }
    }

    public calculate(): number {
        return this.employees.map(employee => Benefits.getEmployeeCost(employee)).reduce((a, b) => a + b);
    }

    public calculateByEmployee(): Array<number> {
        return this.employees.map(employee => Benefits.getEmployeeCost(employee));
    }
}