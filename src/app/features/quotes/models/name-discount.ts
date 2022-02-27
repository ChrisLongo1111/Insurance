import { environment } from "environments/environment";
import { Discount } from "./discount";
import { Person } from "./person";

export class NameDiscount implements Discount {
    public calculate(person: Person, cost: number): number {
        let discount = 0;
        if (person?.firstName?.toLowerCase().startsWith('a')) {
            discount = cost * environment.nameDiscount;
        }
        return discount;
    }
}
