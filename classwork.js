/*
1.	Create NumberHelper type. It should receive and have one property called inputNumber.
 It should have the following methods – isPrime(), getNumberOfDigits(), isFloating(), isPalindrome() (reads the same backward or forward - 1221)

 */

function NumberHelper(inputNumber) {
    this.inputNumber = inputNumber;
}

NumberHelper.prototype.isFloating = function () {
    return !Number.isInteger(this.inputNumber);
}

NumberHelper.prototype.isPrime = function () {
    if (this.inputNumber <= 1 || this.isFloating()) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(this.inputNumber); ++i) {
        if (this.inputNumber % i === 0) {
            return false;
        }
    }
    return true;
}

NumberHelper.prototype.isPalindrome = function () {
    if (this.isFloating()) {
        let array = this.inputNumber.toString().split(".");
        let reversed = array[1].split("").reverse().join("") + "" + array[0].split("").reverse().join("");
        return array.join("") == reversed;
    }
    return this.inputNumber == this.inputNumber.toString().split("").reverse().join("");
}
NumberHelper.prototype.getNumberOfDigits = function () {
    if (this.isFloating()) {
        return this.inputNumber.toString().split(".")[0].length + this.inputNumber.toString().split(".")[1].length;
    }
    return this.inputNumber.toString().split("").length;
}

// var number = new NumberHelper(133.1);
// console.log(number.isFloating());
// console.log(number.isPrime());
// console.log(number.isPalindrome());
// console.log(number.getNumberOfDigits());

/*
2.	Create Employee type. It should have lastName (string), salary (number) birthdate (Date),
employmentYear (number). It should have the following methods -  getExperience (which returns experience of employee (стаж) ) ,
getExperienceInDays, getAge, getDaysUntilRetirement (which returns how many days are until retirement - <<toshak>> , retirement age is 65 years),
then create Programmer subtype, which adds new level (junior, mid, senior) property.  Then creates Office type, which has name,
address and employees array, which can contain programmers and simple employees. Then write method which returns only programmers,
write function to return simple employees, write function which returns junior programmers, write function to return mid programmers,
write function to return senior programmers.
 */

function Employee(lastName, salary, birthDate, employmentYear) {
    this.lastName = lastName;
    this.salary = salary;
    this.birthDate = birthDate;
    this.employmentYear = employmentYear;
    this.className = "Employee";

}

Employee.prototype.getExperience = function () {
    return new Date().getFullYear() - this.employmentYear;
}
Employee.prototype.isLeap = function (year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
Employee.prototype.getExperienceInDays = function () {

    let result = 0;
    for (let i = this.employmentYear; i < new Date().getFullYear(); ++i) {
        result += this.isLeap(i) ? 366 : 365;
    }
    result += this.countDays(0, new Date().getMonth());
    result += new Date().getDate();
    return result;
}

Employee.prototype.getAge = function () {
    let age = 0;
    let currentDate = new Date();
    if ((currentDate.getMonth() > new Date().getMonth.call(this.birthDate)) || (currentDate.getMonth() === new Date().getMonth.call(this.birthDate) && currentDate.getDate() >= new Date().getDate().call(this.birthDate))) {
        age += 1;
    }
    age += currentDate.getFullYear() - new Date().getFullYear.call(this.birthDate) - 1;
    return age;
}
Employee.prototype.countDays = function (startMonth, endMonth, year) {
    let days = 0;
    for (let i = startMonth; i < endMonth; ++i) {
        if (i % 2 === 0 || i === 7) {
            days += 31;
            continue;
        } else if (i === 1) {
            days += this.isLeap(year) ? 29 : 28;
            continue;
        }
        days += 30;
    }
    return days;
}
Employee.prototype.getDaysUntilRetirement = function () {//add leap year check
    const retirementAge = 65;
    var currentDate = new Date();
    var days = 0;
    if (this.getAge() >= retirementAge) {
        return 0;
    }
    let yearsLeft  = retirementAge - this.getAge() - 1;
    days += this.countDays(currentDate.getMonth(), 12);
    days += this.countDays(0, this.birthDate.getMonth()) + this.birthDate.getDate();

    for (let i = currentDate.getFullYear() + 1; i <= (currentDate.getFullYear() + yearsLeft); ++i) {
        days += this.isLeap(i) ? 366 : 365;
    }
    days += currentDate.getDate();
    return days;
}

var employee = new Employee("Khachatryan", 250000, new Date(1997, 9, 17), 2020);
console.log(employee.isLeap(2020));

console.log(employee.getAge());
console.log(employee.getExperience());
console.log(employee.getExperienceInDays());
console.log(employee.getDaysUntilRetirement());

var Level = {
    junior: "JUNIOR",
    mid: "MIDDLE",
    senior: "SENIOR",
    levelCheck: function (level) {
        level = level.toUpperCase();
        if (level === this.junior) {
            return true;
        } else if (level === this.mid) {
            return true;
        } else if (level === this.senior) {
            return true;
        }
        return false;
    }
}

function Programmer(lastName, salary, birthDate, employmentYear, level) {
    Employee.call(this, lastName, salary, birthDate, employmentYear);
    if (Level.levelCheck(level)) {
        this.level = level;
    } else {
        throw "Illegal value for Level";
    }
    this.className = "Programmer";
}

Programmer.prototype = Object.create(Employee.prototype);

var prog = new Programmer("Khachatryan", 250000, new Date(1997, 9, 17), 2020, "junior");

function Office(name, address, employees) {
    this.name = name;
    this.address = address;
    this.employees = employees;
}


Office.prototype.getProgrammers = function (level) {
    return new Array().filter.call(this.employees, value => {
        return value instanceof Programmer && value.level === level;
    })
}
Office.prototype.getSimpleEmployees = function (level) {
    return new Array().filter.call(this.employees, value => {
        return value.className === "Employee";
    })
}
Office.prototype.getProgrammers = function () {
    return new Array().filter.call(this.employees, value => {
        return value instanceof Programmer;
    })
}

var office = new Office("Office", "bla_bal_bal", [new Programmer("Khachatryan", 250000, new Date(2000, 1, 17),
    2020, "junior"),
    new Programmer("Avagyan", 1000000, new Date(2001, 8, 11), 2018, "senior"),
    new Employee("Khachatryan", 1000000, new Date(1980, 0, 17), 2000)]);
console.log(office.getSimpleEmployees());
