// Лабораторна робота 4
// JavaScript: основи та логіка

const output = document.getElementById("output");

function addResult(title, lines) {
    const block = document.createElement("section");
    block.className = "task";

    const heading = document.createElement("h2");
    heading.textContent = title;

    const pre = document.createElement("pre");
    pre.textContent = lines.join("\n");

    block.append(heading, pre);
    output.append(block);

    console.log(`\n--- ${title} ---`);
    lines.forEach((line) => console.log(line));
}

function formatValue(value) {
    if (typeof value === "symbol") {
        return value.toString();
    }

    if (typeof value === "bigint") {
        return `${value}n`;
    }

    return String(value);
}

// Завдання 1. Змінні та типи даних
function task1VariablesAndTypes() {
    const textValue = "Привіт";
    const numberValue = 42;
    const booleanValue = true;
    const nullValue = null;
    let undefinedValue;
    const symbolValue = Symbol("studentId");
    const bigintValue = 12345678901234567890n;

    const primitiveValues = [
        ["string", textValue],
        ["number", numberValue],
        ["boolean", booleanValue],
        ["null", nullValue],
        ["undefined", undefinedValue],
        ["symbol", symbolValue],
        ["bigint", bigintValue]
    ];

    const result = [];
    result.push("Примітивні типи:");
    primitiveValues.forEach(([name, value]) => {
        result.push(`${name}: значення = ${formatValue(value)}, typeof = ${typeof value}`);
    });

    result.push("");
    result.push("Явне перетворення типів:");
    result.push(`String(25) = ${String(25)}, тип: ${typeof String(25)}`);
    result.push(`String(false) = ${String(false)}, тип: ${typeof String(false)}`);
    result.push(`Number("123") = ${Number("123")}`);
    result.push(`Number("") = ${Number("")}`);
    result.push(`Number(true) = ${Number(true)}`);
    result.push(`Number(false) = ${Number(false)}`);
    result.push(`Number(null) = ${Number(null)}`);
    result.push(`Number(undefined) = ${Number(undefined)}`);

    const falsyValues = [0, "", null, undefined, NaN];
    const truthyValues = ["0", [], {}, "false", 42, -1];

    result.push("");
    result.push("Falsy значення:");
    falsyValues.forEach((value) => {
        result.push(`${formatValue(value)} -> Boolean = ${Boolean(value)}`);
    });

    result.push("");
    result.push("Truthy значення:");
    truthyValues.forEach((value) => {
        result.push(`${formatValue(value)} -> Boolean = ${Boolean(value)}`);
    });

    const studentName = "Олена";
    const age = 20;
    const university = "КПІ";
    result.push("");
    result.push("Template literal:");
    result.push(`Студент: ${studentName}, вік: ${age}, університет: ${university}`);

    result.push("");
    result.push("Порівняння == та ===:");
    result.push(`5 == "5" -> ${5 == "5"}`);
    result.push(`5 === "5" -> ${5 === "5"}`);
    result.push(`null == undefined -> ${null == undefined}`);
    result.push(`null === undefined -> ${null === undefined}`);
    result.push(`0 == false -> ${0 == false}`);
    result.push(`0 === false -> ${0 === false}`);

    addResult("Завдання 1. Змінні та типи даних", result);
}

// Завдання 2. Умови та логіка
function getGrade(score) {
    if (typeof score !== "number" || Number.isNaN(score) || score < 0 || score > 100) {
        return "невалідний бал";
    } else if (score <= 59) {
        return "незадовільно";
    } else if (score <= 74) {
        return "задовільно";
    } else if (score <= 89) {
        return "добре";
    }

    return "відмінно";
}

function getSeasonUA(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "зима";
        case 3:
        case 4:
        case 5:
            return "весна";
        case 6:
        case 7:
        case 8:
            return "літо";
        case 9:
        case 10:
        case 11:
            return "осінь";
        default:
            return "невірний номер місяця";
    }
}

function task2Conditions() {
    const result = [];
    const scores = [45, 68, 82, 95, -5, 120, "90"];
    scores.forEach((score) => {
        result.push(`getGrade(${score}) -> ${getGrade(score)}`);
    });

    result.push("");
    const months = [1, 4, 7, 10, 13];
    months.forEach((month) => {
        result.push(`getSeasonUA(${month}) -> ${getSeasonUA(month)}`);
    });

    result.push("");
    const age = 19;
    const status = age >= 18 ? "повнолітній" : "неповнолітній";
    result.push(`Вік ${age}: студент ${status}`);

    addResult("Завдання 2. Умови та логіка", result);
}

// Завдання 3. Масиви
const students = [
    { name: "Олена Коваленко", grade: 87, courses: ["JavaScript", "HTML", "CSS"] },
    { name: "Іван Петренко", grade: 54, courses: ["HTML", "CSS"] },
    { name: "Марія Шевченко", grade: 96, courses: ["JavaScript", "React"] },
    { name: "Андрій Мельник", grade: 73, courses: ["Python", "SQL"] },
    { name: "Софія Бондар", grade: 91, courses: ["JavaScript", "Node.js"] },
    { name: "Дмитро Романюк", grade: 64, courses: ["C#", "SQL"] }
];

function namesList(list) {
    return list.map((item) => `${item.name} (${item.grade})`).join(", ");
}

function task3Arrays() {
    const result = [];

    result.push(`Початковий масив: ${namesList(students)}`);

    const newStudent = { name: "Катерина Лисенко", grade: 78, courses: ["JavaScript", "UI"] };
    students.push(newStudent);
    result.push(`Після push: ${namesList(students)}`);

    const removedLastStudent = students.pop();
    result.push(`Видалено через pop: ${removedLastStudent.name}`);
    result.push(`Після pop: ${namesList(students)}`);

    const removedMiddleStudent = students.splice(2, 1);
    result.push(`Видалено із середини через splice: ${removedMiddleStudent[0].name}`);
    result.push(`Після видалення: ${namesList(students)}`);

    const insertedStudent = { name: "Юрій Ткаченко", grade: 88, courses: ["JavaScript", "Git"] };
    students.splice(2, 0, insertedStudent);
    result.push(`Додано на позицію 3 через splice: ${insertedStudent.name}`);
    result.push(`Після додавання: ${namesList(students)}`);

    const bestStudent = students.find((student) => student.grade > 90);
    result.push(`Перший студент з оцінкою вище 90: ${bestStudent.name}, ${bestStudent.grade}`);

    const javascriptStudents = students.filter((student) => student.courses.includes("JavaScript"));
    result.push(`Студенти, які вивчають JavaScript: ${javascriptStudents.map((student) => student.name).join(", ")}`);

    const totalGrade = students.reduce((sum, student) => sum + student.grade, 0);
    const averageGrade = totalGrade / students.length;
    result.push(`Середня оцінка всіх студентів: ${averageGrade.toFixed(2)}`);

    addResult("Завдання 3. Масиви", result);
}

// Завдання 4. Функції
function rectangleAreaDeclaration(width, height) {
    return width * height;
}

const rectangleAreaExpression = function (width, height) {
    return width * height;
};

const rectangleAreaArrow = (width, height) => width * height;

function createCounter() {
    let value = 0;

    return {
        increment() {
            value += 1;
            return value;
        },
        decrement() {
            value -= 1;
            return value;
        },
        getValue() {
            return value;
        }
    };
}

function createUser(name, role = "student", isActive = true) {
    return {
        name,
        role,
        isActive
    };
}

const sum = (...numbers) => numbers.reduce((total, number) => total + number, 0);

function printStudentInfo({ name, grade, courses }) {
    return `${name} має оцінку ${grade}. Курси: ${courses.join(", ")}`;
}

function task4Functions() {
    const result = [];

    result.push(`Function Declaration: площа 5 x 4 = ${rectangleAreaDeclaration(5, 4)}`);
    result.push(`Function Expression: площа 6 x 3 = ${rectangleAreaExpression(6, 3)}`);
    result.push(`Arrow Function: площа 7 x 2 = ${rectangleAreaArrow(7, 2)}`);

    const counter = createCounter();
    result.push("");
    result.push(`counter.increment() -> ${counter.increment()}`);
    result.push(`counter.increment() -> ${counter.increment()}`);
    result.push(`counter.decrement() -> ${counter.decrement()}`);
    result.push(`counter.getValue() -> ${counter.getValue()}`);

    result.push("");
    result.push(`createUser("Олена") -> ${JSON.stringify(createUser("Олена"))}`);
    result.push(`createUser("Ігор", "admin", false) -> ${JSON.stringify(createUser("Ігор", "admin", false))}`);

    result.push("");
    result.push(`sum(1, 2, 3) -> ${sum(1, 2, 3)}`);
    result.push(`sum(10, 20) -> ${sum(10, 20)}`);
    result.push(`sum(5, 5, 5, 5) -> ${sum(5, 5, 5, 5)}`);

    result.push("");
    result.push(printStudentInfo(students[0]));
    result.push(printStudentInfo(students[2]));

    addResult("Завдання 4. Функції", result);
}

// Завдання 5. Об'єкти
const studentProfile = {
    firstName: "Олена",
    lastName: "Коваленко",
    age: 20,
    university: "КПІ",
    grades: {
        math: 85,
        physics: 92,
        programming: 96,
        lab: 90
    },
    isActive: true,
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    getAverageGrade() {
        const grades = Object.values(this.grades);
        const total = grades.reduce((sumValue, grade) => sumValue + grade, 0);
        return total / grades.length;
    }
};

function task5Objects() {
    const result = [];

    result.push(`Повне ім'я: ${studentProfile.getFullName()}`);
    result.push(`Середня оцінка: ${studentProfile.getAverageGrade().toFixed(2)}`);

    result.push("");
    result.push(`Доступ через крапку: ${studentProfile.university}`);
    result.push(`Доступ через квадратні дужки: ${studentProfile["age"]}`);
    const dynamicKey = "isActive";
    result.push(`Динамічний ключ studentProfile[dynamicKey]: ${studentProfile[dynamicKey]}`);

    result.push("");
    result.push(`Object.keys: ${Object.keys(studentProfile).join(", ")}`);
    result.push(`Object.values: ${Object.values(studentProfile).map(formatValue).join(", ")}`);
    result.push("Object.entries:");
    Object.entries(studentProfile).forEach(([key, value]) => {
        result.push(`${key}: ${formatValue(value)}`);
    });

    const copiedProfile = {
        ...studentProfile,
        university: "ЛНУ"
    };

    result.push("");
    result.push(`Оригінальний університет: ${studentProfile.university}`);
    result.push(`Університет у копії: ${copiedProfile.university}`);

    const labScore = studentProfile.grades?.lab;
    const mentorName = studentProfile.mentor?.name ?? "Не призначено";

    result.push("");
    result.push(`Optional chaining grades?.lab: ${labScore}`);
    result.push(`Optional chaining mentor?.name: ${mentorName}`);

    addResult("Завдання 5. Об'єкти", result);
}

// Завдання 6. Ланцюжки методів масивів
const products = [
    { name: "Ноутбук", price: 25000, category: "electronics", inStock: true, quantity: 5 },
    { name: "Миша", price: 600, category: "electronics", inStock: true, quantity: 20 },
    { name: "Клавіатура", price: 1400, category: "electronics", inStock: false, quantity: 8 },
    { name: "Стіл", price: 4200, category: "furniture", inStock: true, quantity: 3 },
    { name: "Крісло", price: 5200, category: "furniture", inStock: true, quantity: 4 },
    { name: "Ручка", price: 25, category: "stationery", inStock: true, quantity: 100 },
    { name: "Зошит", price: 55, category: "stationery", inStock: false, quantity: 60 },
    { name: "Монітор", price: 8500, category: "electronics", inStock: true, quantity: 6 }
];

function task6ArrayChains() {
    const result = [];

    const stockTotal = products
        .filter((product) => product.inStock)
        .map((product) => product.price * product.quantity)
        .reduce((total, value) => total + value, 0);

    result.push(`Загальна вартість товарів у наявності: ${stockTotal} грн`);

    const electronicsNames = products
        .filter((product) => product.category === "electronics")
        .sort((a, b) => a.price - b.price)
        .map((product) => product.name);

    result.push(`Електроніка від дешевшої до дорожчої: ${electronicsNames.join(", ")}`);

    const categoriesCount = products.reduce((resultObject, product) => {
        if (resultObject[product.category]) {
            resultObject[product.category] += 1;
        } else {
            resultObject[product.category] = 1;
        }

        return resultObject;
    }, {});

    result.push(`Кількість товарів за категоріями: ${JSON.stringify(categoriesCount)}`);

    const studentsByGrade = [...students].sort((a, b) => b.grade - a.grade);
    const studentsByName = [...students].sort((a, b) => a.name.localeCompare(b.name, "uk"));

    result.push(`Студенти за оцінкою: ${namesList(studentsByGrade)}`);
    result.push(`Студенти за ім'ям: ${namesList(studentsByName)}`);

    addResult("Завдання 6. Ланцюжки методів масивів", result);
}

// Завдання 7. Рядки
function capitalize(str) {
    if (str.length === 0) {
        return "";
    }

    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function countWords(str) {
    const trimmed = str.trim();

    if (trimmed.length === 0) {
        return 0;
    }

    return trimmed.split(" ").filter((word) => word !== "").length;
}

function truncate(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }

    return `${str.slice(0, maxLength)}...`;
}

function isValidEmail(email) {
    if (!email.includes("@")) {
        return false;
    }

    const firstAt = email.indexOf("@");
    const lastAt = email.lastIndexOf("@");

    if (firstAt !== lastAt || firstAt === 0) {
        return false;
    }

    const dotAfterAt = email.indexOf(".", firstAt + 1);
    const lastDot = email.lastIndexOf(".");

    if (dotAfterAt === -1 || dotAfterAt === firstAt + 1) {
        return false;
    }

    return email.length - lastDot - 1 >= 2;
}

function task7Strings() {
    const result = [];

    result.push(`capitalize("javaScript") -> ${capitalize("javaScript")}`);
    result.push(`capitalize("hello world") -> ${capitalize("hello world")}`);
    result.push(`capitalize("") -> "${capitalize("")}"`);

    result.push("");
    result.push(`countWords("JavaScript це круто") -> ${countWords("JavaScript це круто")}`);
    result.push(`countWords(" пробіли між словами ") -> ${countWords(" пробіли між словами ")}`);
    result.push(`countWords("   ") -> ${countWords("   ")}`);

    result.push("");
    result.push(`truncate("Це довгий текст для прикладу", 15) -> ${truncate("Це довгий текст для прикладу", 15)}`);
    result.push(`truncate("Короткий", 20) -> ${truncate("Короткий", 20)}`);

    result.push("");
    const emails = ["user@example.com", "invalid-email", "@example.com", "user@.com", "user@test.ua", "user@@test.com"];
    emails.forEach((email) => {
        result.push(`isValidEmail("${email}") -> ${isValidEmail(email)}`);
    });

    addResult("Завдання 7. Рядки", result);
}

// Запуск усіх завдань
function runLab() {
    task1VariablesAndTypes();
    task2Conditions();
    task3Arrays();
    task4Functions();
    task5Objects();
    task6ArrayChains();
    task7Strings();
}

runLab();
