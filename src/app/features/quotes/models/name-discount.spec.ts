import { Benefits } from './benefits';
import { Dependent } from './dependent';
import { Employee } from './employee';
import { NameDiscount } from './name-discount';
import { Person } from './person';

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
