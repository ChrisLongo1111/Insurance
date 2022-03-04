import { Employee } from '@features/quotes/models/employee';
import { NameDiscount } from '@features/quotes/models/name-discount';

describe('Name Discount', () => {
    let nameDiscount = new NameDiscount();
    let employee = new Employee();
    employee.firstName = 'Andy';

  it('should be 100 if the employee name is Andy', () => {
    employee.firstName = 'Andy';
    expect(nameDiscount.calculate(employee, 1000)).toBe(100);
  });

  it('should be 0 if the employee name is Chris', () => {
    employee.firstName = 'Chris';
    expect(nameDiscount.calculate(employee, 1000)).toBe(0);
  });
});
