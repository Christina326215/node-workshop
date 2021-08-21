let car1 = {
    brand: "ford",
    color: "red",
    owner: "Paul",
};

let car2 = car1;
car2 = {
    owner: "Jack",
}

console.log(car1.owner);