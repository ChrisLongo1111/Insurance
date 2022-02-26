import { Dependent } from './dependent';
import { Employee } from './employee';
import { Quote } from './quote';

describe('Quote with two employees and two dependents each with one name starting with a', () => {
  let quote: Quote = new Quote();
  let employee = new Employee();
  employee.firstName = 'Chris';
  employee.lastName = 'Longo';
  let dependent = new Dependent();
  dependent.firstName = 'Mike';
  dependent.lastName = 'Longo'
  employee.dependents.push(dependent);
  dependent = new Dependent();
  dependent.firstName = 'Andy';
  dependent.lastName = 'Longo'
  employee.dependents.push(dependent);
  quote.employees.push(employee);

  employee = new Employee();
  employee.firstName = 'Chris';
  employee.lastName = 'Long';
  dependent = new Dependent();
  dependent.firstName = 'Mike';
  dependent.lastName = 'Long'
  employee.dependents.push(dependent);
  dependent = new Dependent();
  dependent.firstName = 'Denise';
  dependent.lastName = 'Long'
  employee.dependents.push(dependent);
  quote.employees.push(employee);

  it('should be 3950', () => {
    expect(quote.calculate()).toBe(3950);
  });
});

describe('Quote with two employees and two dependents each with all names starting with a', () => {
  let quote: Quote = new Quote();
  let employee = new Employee();
  employee.firstName = 'Andrew';
  employee.lastName = 'Longo';
  let dependent = new Dependent();
  dependent.firstName = 'Anne';
  dependent.lastName = 'Longo'
  employee.dependents.push(dependent);
  dependent = new Dependent();
  dependent.firstName = 'Andy';
  dependent.lastName = 'Longo'
  employee.dependents.push(dependent);
  quote.employees.push(employee);

  employee = new Employee();
  employee.firstName = 'Andrew';
  employee.lastName = 'Long';
  dependent = new Dependent();
  dependent.firstName = 'Andy';
  dependent.lastName = 'Long'
  employee.dependents.push(dependent);
  dependent = new Dependent();
  dependent.firstName = 'Anne';
  dependent.lastName = 'Long'
  employee.dependents.push(dependent);
  quote.employees.push(employee);

  it('should be 3600', () => {
    expect(quote.calculate()).toBe(3600);
  });
});
