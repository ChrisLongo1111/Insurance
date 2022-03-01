export interface IPerson {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
}
export class Person implements IPerson {
    constructor(person?: IPerson) {
        if (person) {
            this.id = person.id;
            this.firstName = person.firstName;
            this.lastName = person.lastName;
        }
    }

    public id: number | undefined;
    public firstName: string | undefined;
    public lastName: string | undefined;
}