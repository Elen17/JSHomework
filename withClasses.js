/*
1.	Create NumberHelper type. It should receive and have one property called inputNumber.
 It should have the following methods – isPrime(), getNumberOfDigits(), isFloating(), isPalindrome() (reads the same backward or forward - 1221)

 */

class NumberHelper {
    constructor(inputNumber) {
        this.inputNumber = inputNumber;
    }

    isFloating() {
        return this.inputNumber.toString().split(".").length === 2;
    }

    getNumberOfDigits() {
        let split = this.inputNumber.toString().split("");
        return split.indexOf(".") !== -1 ? split.length - 1 : split.length;
    }

    isPrime() {
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

    isPalindrome() {
        if (this.isFloating()) {
            let array = this.inputNumber.toString().split(".");
            let reversed = array[1].split("").reverse().join("") + "" + array[0].split("").reverse().join("");
            return array.join("") == reversed;
        }
        return this.inputNumber == this.inputNumber.toString().split("").reverse().join("");

    }

}

//
var number = new NumberHelper(131.0);
console.log(number.isFloating());
console.log(number.isPrime());
console.log(number.isPalindrome());
console.log(number.getNumberOfDigits());


//2

class Employee {
    constructor(lastName, salary, birthDate, employmentYear) {
        this.lastName = lastName;
        this.salary = salary;
        this.birthDate = birthDate;
        this.employmentYear = employmentYear;
        this.age = this.countAge();
        this.className = "Employee";

    }

    countAge() {
        let age = 0;
        let currentDate = new Date();
        if ((currentDate.getMonth() > new Date().getMonth.call(this.birthDate)) || (currentDate.getMonth() === new Date().getMonth.call(this.birthDate) && currentDate.getDate() >= new Date().getDate().call(this.birthDate))) {
            age += 1;
        }
        age += currentDate.getFullYear() - new Date().getFullYear.call(this.birthDate) - 1;
        return age;

    }

    isLeap(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    getExperience = function () {
        return new Date().getFullYear() - this.employmentYear;
    }

    getExperienceInDays() {

        let result = 0;
        for (let i = this.employmentYear; i < new Date().getFullYear(); ++i) {
            result += this.isLeap(i) ? 366 : 365;
        }
        result += this.countDays(0, new Date().getMonth());
        result += new Date().getDate();
        return result;
    }

    getAge() {
        return this.age;
    }

    countDays(startMonth, endMonth, year) {
        var days = 0;
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

    getDaysUntilRetirement() {
        const retirementAge = 65;
        var currentDate = new Date();
        var days = 0;
        if (this.getAge() >= retirementAge) {
            return 0;
        }
        var yearsLeft;
        yearsLeft = retirementAge - this.getAge() - 1;
        days += this.countDays(currentDate.getMonth(), 12);
        days += this.countDays(0, this.birthDate.getMonth()) + this.birthDate.getDate();

        for (let i = currentDate.getFullYear() + 1; i <= (currentDate.getFullYear() + yearsLeft); ++i) {
            days += this.isLeap(i) ? 366 : 365;
        }
        days += currentDate.getDate();
        return days;
    }

}


var employee = new Employee("Khachatryan", 250000, new Date(1997, 9, 17), 2020);
// console.log(employee.isLeap(1700));

console.log(employee.getAge());
console.log(employee.getExperience());
console.log(employee.getExperienceInDays());
console.log(employee.getDaysUntilRetirement());


var Level = {
    junior: "JUNIOR",
    mid: "MIDDLE",
    senior: "SENIOR",
    isCorrectLevel: function (level) {
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

class Programmer extends Employee {
    constructor(lastName, salary, birthDate, employmentYear, level) {
        super(lastName, salary, birthDate, employmentYear);
        if (!Level.isCorrectLevel(level)) {
            throw "Illegal level passed";
        }
        this.level = level;
        this.className = "Programmer";
    }

}

class Office {

    constructor(name, address, employees) {
        this.name = name;
        this.address = address;
        this.employees = employees;
    }

    getProgrammers = function (level) {
        return new Array().filter.call(this.employees, value => {
            return value.className === Programmer && value.level === level;
        })
    }
    getSimpleEmployees = function (level) {
        return new Array().filter.call(this.employees, value => {
            return value.className === "Employee"
        })
    }
    getProgrammers = function () {
        return new Array().filter.call(this.employees, value => {
            return value.className === "Programmer";
        })
    }
}


var office = new Office("Office", "bla_bal_bal", [new Programmer("Khachatryan", 250000, new Date(2000, 1, 17),
    2020, "junior"),
    new Programmer("Avagyan", 1000000, new Date(2001, 8, 11), 2018, "senior"),
    new Employee("Khachatryan", 1000000, new Date(1980, 0, 17), 2000)]);
console.log(office.getProgrammers());
var a = 15;

/*
3.	A stack is a collection of objects that are inserted and removed according to the last-in, first-out (LIFO) principle.
A user may insert objects into a stack at any time, but may only access or remove the most recently inserted object that
remains (at the so-called “top” of the stack). The name “stack” is derived from the metaphor of a stack of plates in a spring-loaded,
cafeteria plate dispenser. In this case, the fundamental operations involve the “pushing” and “popping” of plates on the stack.
When we need a new plate from the dispenser, we “pop” the top plate off the stack, and when we add a plate,
we “push” it down on the stack to become the new top plate.

So implement Stack type, which should have
o	push(e): Adds element e to the top of the stack.
o	pop( ): Removes and returns the top element from the stack (or null if the stack is empty).
o	top( ): Returns the top element of the stack, without removing it(or null if the stack is empty).
o	size( ): Returns the number of elements in the stack.
o	isEmpty( ): Returns a boolean indicating whether the stack is empty.
 */
class Stack {

    constructor() {
        this.stack = new Array(this.DEFAULT_CAPACITY);
        this.size = 0;
        this.currentIndex = 20;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return !(this.size);
    }

    top() {
        return !this.size ? null : this.stack[this.currentIndex];
    }

    pop() {
        if (!this.size) {
            return null;
        }
        let result = this.stack[this.currentIndex];
        this.size--;
        this.stack[this.currentIndex++] = undefined;
        return result;

    }

    push(element) {
        if (this.currentIndex === 0) {
            let newStack = new Array(this.size + Stack.DEFAULT_CAPACITY / 2);
            for (let i = 0; i < this.size; i++) {
                newStack[Stack.DEFAULT_CAPACITY / 2 + i] = this.stack[i];
            }
            this.currentIndex = Stack.DEFAULT_CAPACITY / 2;
            this.stack = newStack;
        }
        this.stack[--this.currentIndex] = element;
        ++this.size;

    }

    toString() {
        let result = "";
        for (let i = this.currentIndex; this.stack[i] !== undefined; ++i) {
            result += (this.stack[i]) + " ";
        }
        return "[" + result.trim() + "]";
    }
}

Object.defineProperty(Stack, "DEFAULT_CAPACITY", {
    value: 20,
    writable: false,
    enumerable: false,
    configurable: false,
});
var stack = new Stack();
console.log(stack.isEmpty());
console.log(stack.getSize());

for (let i = 0; i < 21; ++i) {
    stack.push(i + 1);
}
for (let i = 0; i < 22; ++i) {
    stack.pop();
}
for (let i = 0; i < 25; ++i) {
    stack.push(i * 2);
}
stack.push(null);
console.log(stack.toString());
console.log(stack.top());


/*
4.	Another fundamental data structure is the queue. It is a close “cousin” of the stack, but a queue is a collection of objects
that are inserted and removed according to the first-in, first-out (FIFO) principle. That is, elements can be inserted at any time,
but only the element that has been in the queue the longest can be next removed. We usually say that elements enter a queue at the
back and are removed from the front. A metaphor for this terminology is a line of people waiting to get on an amusement park ride.
People waiting for such a ride enter at the back of the line and get on the ride from the front of the line.
So implement Queue type, which has
o	enqueue(e): Adds element e to the back of queue.
o	dequeue( ): Removes and returns the first element from the queue(or null if the queue is empty).
o	first( ): Returns the first element of the queue, without removing it (or null if the queue is empty).
o	size( ): Returns the number of elements in the queue.
o	isEmpty( ): Returns a boolean indicating whether the queue is empty.

 */

class Queue {
    constructor() {
        this.queue = new Array(Stack.DEFAULT_CAPACITY);
        this.size = 0;
        this.lastIndex = 0;
        this.firstIndex = 0;
    }

    isEmpty() {
        return !this.size;
    }

    getSize() {
        return this.size;
    }

    getFirst() {
        return !this.size ? null : this.queue[this.firstIndex];//+-
    }

    dequeue() {
        if (!this.size) {
            return null;
        }

        let result = this.queue[this.firstIndex];
        this.queue[this.firstIndex++] = undefined;
        --this.size;
        if (!this.size) {
            this.firstIndex = 0;
            this.lastIndex = 0;
            return;
        }


        return result;
    }

    enqueue(element) {
        if (this.lastIndex === this.queue.length) {

            let newQueue = new Array(this.queue.length + Queue.DEFAULT_CAPACITY / 2);
            for (let i = 0; i < this.size; i++) {
                newQueue[i] = this.queue[i];
            }
            this.queue = newQueue;
            this.firstIndex = 0;
            this.lastIndex = this.size;
        }

        this.queue[this.lastIndex++] = element;
        ++this.size;

    }

    toString() {
        let result = "";
        for (let i = this.firstIndex; i < this.lastIndex; ++i) {
            result += (this.queue[i]) + " ";
        }
        return "[" + result.trim() + "]";
    }
}

Object.defineProperty(Queue, "DEFAULT_CAPACITY", {
    value: 20,
    writable: false,
    enumerable: false,
    configurable: false
})


var queue = new Queue();
console.log(queue.isEmpty());
console.log(queue.getSize());
for (let i = 0; i < 21; i++) {
    queue.enqueue(i + 1);
}
console.log(queue.getFirst());
for (let i = 0; i < 11; i++) {
    queue.dequeue();
}
console.log(queue.toString());

/*
Priority queue is a collection of prioritized elements that allows arbitrary element insertion, and allows the removal of
the element that has first priority. When an element is added to a priority queue, the user designates its priority by
providing an associated key. The element with the minimal key will be the next to be removed from the queue
(thus, an element with key 1 will be given priority over an element with key 2).
Although it is quite common for priorities to be expressed numerically, any Java object may be used as a key,
as long as there exists means to compare any two instances a and b, in a way that defines a natural order of the keys.
So implement PriorityQueue type, which has:

    insert(k, v): Creates an entry with key k and value v in the priority queue.
    min( ): Returns (but does not remove) a priority queue entry (k,v) having minimal key; returns null if the priority queue is empty.
    removeMin( ): Removes and returns an entry (k,v) having minimal key from the priority queue; returns null if the priority queue is empty.
    size( ): Returns the number of entries in the priority queue.
    isEmpty( ): Returns a boolean indicating whether the priority queue isempty.

 */
class PriorityQueue {
    constructor() {
        this.priorQueue = new Array(this.DEFAULT_CAPACITY);
        this.size = 0;
        this.currentIndex = 0;
    }

    isEmpty() {
        return !this.size;
    }

    getSize() {
        return this.size;
    }

    min() {
        return this.size ? this.priorQueue[this.currentIndex] : null;
    }

    removeMin() {
        if (!this.size) {
            return null;
        }
        var result = this.priorQueue[this.currentIndex];
        this.priorQueue[this.currentIndex++] = undefined;
        --this.size;
        return result;
    }

    insert(key, value) {
        if (this.currentIndex === this.priorQueue.length) {
            let newPriorQueue = new Array(this.priorQueue.length + this.DEFAULT_CAPACITY);
            for (let i = this.currentIndex; i < this.size; ++i) {
                newPriorQueue[i] = this.priorQueue[i];
            }
            this.priorQueue = newPriorQueue;
            this.currentIndex = 0;
        }
        let newObject = {key: key, value: value};
        let index = this.currentIndex;
        for (let i = this.currentIndex; i < this.size; ++i) {
            if (this.compare(this.priorQueue[i], newObject) > 0) {
                break;
            }
            ++index;
        }
        if (index < this.size) {
            let array = this.priorQueue.slice(index, this.size);
            for (let i = 0; i < array.length; i++) {
                this.priorQueue[index + 1 + i] = array[i];
            }
        }
        this.priorQueue[index] = newObject;


        ++this.size;
    }

    toString() {
        let result = "";
        for (let i = this.currentIndex; this.priorQueue[i] !== undefined; ++i) {
            result += this.toStringObject(this.priorQueue[i]) + "\n";
        }
        return "[" + result.trim() + "]";
    }

    toStringObject(object) {
        if (!object) {
            return "";
        }
        return "{key: " + object.key + ", value: " + object.value + "}";
    }

    compare(arg1, arg2) {
        let random = Math.random() * 100 + 1;
        if (!isNaN(arg1.key) && !isNaN(arg2.key)) {
            return arg1.key - arg2.key > 0 ? random : (arg1.key === arg2.key ? 0 : -random)
        }
        return arg1.key > arg2.key ? random : (arg1.key === arg2.key ? 0 : -random);
    }

}

Object.defineProperty(PriorityQueue, "DEFAULT_CAPACITY", {
    writable: false,
    enumerable: false,
    value: 20,
    configurable: false
});

var priorQueue = new PriorityQueue();
for (let i = 0; i < 20; i++) {
    priorQueue.insert(Math.random() * 200 + i + "", 2 * Math.random() * i);
}
console.log(priorQueue.min());
console.log(priorQueue.isEmpty());
console.log(priorQueue.getSize());
console.log(priorQueue.toString());
for (let i = 0; i < 10; i++) {
    priorQueue.removeMin();
}
console.log("\n\n");
priorQueue.insert("gee", 47);
priorQueue.insert("fee", 47);
priorQueue.insert("gye", 47);

console.log(priorQueue.toString());
