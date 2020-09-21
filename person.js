class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greeting() {
    console.log(`Greeting ${this.name} of age ${this.age}`);
  }
}

module.exports = Person;
