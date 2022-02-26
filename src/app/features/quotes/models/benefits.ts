import { environment } from "src/environments/environment";
import { Dependent } from "./dependent";
import { Discount } from "./discount";
import { Employee } from "./employee";
import { NameDiscount } from "./name-discount";
import { Person } from "./person";

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

    public static getIncome(person: Person): number {
        if (person instanceof Employee) {
            return 2000;
        }
        return 0;
    }
}