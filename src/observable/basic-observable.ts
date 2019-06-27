import { Observable, from, of, range, interval, timer, fromEvent } from 'rxjs';
import { render } from './render';

const observableCreate = () => {
    //Funcion create
    // Suscripciones y Observadores
    const hello = Observable.create((observer:any) => {
        observer.next('Hello');
        setTimeout(() => {
            observer.next('World');
            observer.complete();
        },2000);
    });
    const observer = {
        next: (evt:any) => render(evt),
        error: (err:any) => console.error("ERROR: ",err),
        complete: () => render('DONE')
    };
    const subscribe = hello.subscribe(observer);
    subscribe.unsubscribe();
    const subscribe2 = hello.subscribe(observer);
    // cada subscripcion es un nuevo flujo de datos.
    // cerrar el flujo de eventos: -> subscribe.unsubscribe();
}

const observableFrom = () => {
    //Funcion from
    // funcion from: te permite crear un observable apartir de lo que quieras!
    const myArray = [1,2,3,4,5];
    const myString = "Hello world";
    const myPromise = new Promise(resolve => setTimeout(() => {
        resolve("Hello World")
    },2000));

    const observableFromArray = from(myArray);
    const observableFromString = from(myString);
    const observableFromPromise = from(myPromise);

    const subscriptionArr = observableFromArray.subscribe((ev:number) => render(ev.toString()));
    const subscriptionStr = observableFromString.subscribe((ev:string) => render(ev));
    const subscriptionPro = observableFromPromise.subscribe((ev:string) => render(ev));
}

const observableOf = () => {
    //Funcion of
    // funcion of: sirve para crear secuencias de observables apartir de lo que quieras!
    // funcion range: generar observables con un rango numerico
    const source = of(1,2,3,4,5);
    const source2 = of(
        [1,2,3],
        {foo:"bar"},
        function sayHello(){
            return "Hi!"
        }
        );
    const source3 = range(3,10);
    const subscripcion = source.subscribe((ev:number) => render(ev.toString()))
    const subscripcion2 = source2.subscribe((ev:any) => render(ev))
    const subscripcion3 = source3.subscribe((ev:number) => render(ev.toString()))
}
const observableInterval = () => {
    //Funcion interval
    // funcion interval: sirve para crear secuencias de observables apartir de eventos que se repiten cada x tiempo
    // funcion timer: sirve para obtener un evento al cabo de cierto tiempo - (sea tiempo despues o antes de tiempo)

    const source = interval(500);
   
    const subscripcion = source.subscribe((ev:number) => render(ev.toString()))
    timer(3000).subscribe(() => subscripcion.unsubscribe());

    const source2 = timer(4000,100);
    const subscripcion2 = source2.subscribe((ev) => render(`2 - ${ev}`));

    timer(6000).subscribe(() => subscripcion2.unsubscribe());
}
const observableFromEvent = () => {
    //Funcion fromEvent
    // funcion fromEvent: genera un observable apartir de una tipologia de eventos concreta apartir de un event target

    const actionBtn = document.getElementById('action-btn');
    const source = fromEvent(actionBtn,'click');
   
    const subscripcion = source.subscribe((ev:any) => render(`click event at pos (${ev.x}, ${ev.y})`))

    fromEvent(document,'mousemove').subscribe((ev) => console.log(ev));
}

export default () => {
    // observableCreate();
    // observableFrom();
    // observableOf();
    // observableInterval();
    // observableFromEvent();
}