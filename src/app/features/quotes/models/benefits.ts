import { environment } from "environments/environment";
import { Dependent } from "@features/quotes/models/dependent";
import { Discount } from "@features/quotes/models/discount";
import { Employee } from "@features/quotes/models/employee";
import { NameDiscount } from "@features/quotes/models/name-discount";
import { Person } from "@features/quotes/models/person";

export class Benefits {
    private static discounts: Array<Discount> = [new NameDiscount()]

    public static getCost(person: Person): number {
        let cost: number = 0;
        if (person instanceof Dependent) {
            cost = environment.dependentCost;
        } else if (person instanceof Employee) {
            cost = environment.employeeCost;
        }
        cost -= this.discounts.map(discount => discount.calculate(person, cost)).reduce((a, b) => a + b, 0);
        return cost;
    }

    public static getEmployeeCost(employee: Employee): number {
        return Benefits.getCost(employee) + employee.dependents?.map(dependent => Benefits.getCost(dependent))?.reduce((a, b) => a + b, 0);
    }

    public static getIncome(person: Person): number {
        if (person instanceof Employee) {
            return environment.employeeIncome;
        }
        return 0;
    }
}