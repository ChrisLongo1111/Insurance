import { environment } from "environments/environment";
import { Dependent } from "@features/quotes/models/dependent";
import { Discount } from "@features/quotes/models/discount";
import { Employee } from "@features/quotes/models/employee";
import { NameDiscount } from "@features/quotes/models/name-discount";
import { Person } from "@features/quotes/models/person";

export class Benefits {
    private static discounts: Array<Discount> = [new NameDiscount]

    public static getCost(person: Person): number {
        let cost: number = 0;
        if (person instanceof Dependent) {
            cost = environment.dependentCost;
        } else if (person instanceof Employee) {
            cost = environment.employeeCost;
        }
        this.discounts.forEach(discount => {
            cost -= discount.calculate(person, cost);
        });
        return cost;
    }

    public static getEmployeeCost(employee: Employee): number {
        let quote: number = 0;
        quote += Benefits.getCost(employee);
        employee.dependents.forEach(dependent => {
            quote += Benefits.getCost(dependent);
        })
        return quote;
    }

    public static getIncome(person: Person): number {
        if (person instanceof Employee) {
            return 2000;
        }
        return 0;
    }
}