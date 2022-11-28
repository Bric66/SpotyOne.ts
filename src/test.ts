class Person {

    name: string;
    lastName: string;

    walk () {

          }

}

class Person2 extends Person{

    adress: string;

}

class Player extends Person2 {

}

const p = new Player();
p.walk()
