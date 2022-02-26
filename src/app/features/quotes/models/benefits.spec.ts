import { Benefits } from './benefits';
import { Dependent } from './dependent';
import { Employee } from './employee';
import { Person } from './person';

describe('Benefits', () => {
  it('employee cost should be 1000', () => {
    expect(Benefits.getCost(new Employee)).toBe(1000);
  });

  it('dependent cost should be 500', () => {
    expect(Benefits.getCost(new Dependent)).toBe(500);
  });

  it('person cost should be 0', () => {
    expect(Benefits.getCost(new Person)).toBe(0);
  });

  it('person income should be 0', () => {
    expect(Benefits.getIncome(new Person)).toBe(0);
  });

  it('employee income should be 2000', () => {
    expect(Benefits.getIncome(new Employee)).toBe(2000);
  });

  it('dependent income should be 0', () => {
    expect(Benefits.getIncome(new Dependent)).toBe(0);
  });
});
