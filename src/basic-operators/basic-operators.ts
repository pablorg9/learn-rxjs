import { render } from '../common/render';
import { fromEvent } from 'rxjs';
import { mapTo,map,filter,tap, first, take, takeWhile, last, takeLast, skip, reduce, scan } from 'rxjs/operators';


const basicMapOperators = () => {
    // operador map: Transformacion de la data (map igual al de vanilla js)
    // operador mapTo: Transforma a un texto o algo que se le especifique
    // operador filter: filtra la data (filter igual al de vanilla js)

    // Descripcion ejemplo: 
    // Tenemos un cuadro como de ajedrez donde con el map mostramos a que casilla se le dio click
    // y con el filter si la casilla es impar se muestra en pantalla
    const grid = document.getElementById('grid');
    // const click$ = fromEvent(grid,'click').pipe(mapTo('CLICK'))
    const click$ = fromEvent(grid,'click').pipe(
        map((val:any) => [Math.floor(val.offsetX / 50),Math.floor(val.offsetY / 50)] ),
        filter((val:number[]) => (val[0]+val[1])%2 != 0)
        )
    const subscription = click$.subscribe((ev:any) => render(ev));
}
const basicTapOperators = () => {
    // operador tap: es muy util para leer informacion en cualquier punto del stream de datos
    // y generar acciones fuera de este

    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid,'click').pipe(
        tap((val:any) => console.log(`before: ${val}`)),
        map((val:any) => [Math.floor(val.offsetX / 50),Math.floor(val.offsetY / 50)] ),
        filter((val:number[]) => (val[0]+val[1])%2 != 0),
        tap((val:any) => console.log(`after : ${val}`))
        )
    const subscription = click$.subscribe((ev:any) => render(ev));
}
const basicFirstTakeOperators = () => {
    // operador first: Captura el primer evento emitido(limita el numero de eventos a uno segun una condicion)
    // operador take: limita a un numero de eventos que enviamos por parametro
    // operador takeWhile: emite eventos mientras cumpla una determinada condicion
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid,'click').pipe(
        map((val:any) => [Math.floor(val.offsetX / 50),Math.floor(val.offsetY / 50)] ),
        // first(val => val[0]>3) //emite solo el primero donde la columna sea mayor que 3
        // take(4), // emite solo los primero 4 eventos
        takeWhile(([col,row]) => col>3)//mientras que la columna sea mayor que 3
        )
    const subscription = click$.subscribe((ev:any) => render(ev));
}
const basicLastTakeLastSkipOperators = () => {
    // operador last: muestra el ultimo evento emitido.
    // operador takeLast: captura los ultimos eventos emitidos
    // operador skip: salta eventos emitidos segun el parametro que se ponga
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid,'click').pipe(
        map((val:any) => [Math.floor(val.offsetX / 50),Math.floor(val.offsetY / 50)] ),
        takeWhile(([col,row]) => col>3),
        tap(ev => console.log(`valid in takeWhile: [${ev}]`)),
        // last() en este caso captura el ultimo evento emitido por el takeWhile
        //takeLast(3) // captura los ultimos 3 elementos omitidos
        skip(5) // en este caso salta los 5 primeros eventos
        )
    const subscription = click$.subscribe((ev:any) => render(ev));
}
const basicReduceScanOperators = () => {
    // operador reduce: se dedica aplicar una funcion a un evento y devuelve el resultado cuando se cierra el stream.
    // operador scan: es igual que reduce solo que en vez de esperar que se cierre el flujo, emite un evento cada vez que se se ejecute un evento
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid,'click').pipe(
        map((val:any) => [Math.floor(val.offsetX / 50),Math.floor(val.offsetY / 50)] ),
        takeWhile(([col,row]) => col!=0),
        // reduce((accumulated,current) => {
        //     return {
        //         clicks: accumulated.clicks+1,
        //         cells: [...accumulated.cells,current]
        //     }
        // }, 
        //     {clicks:0,cells:[]}
        // )
        scan((accumulated,current) => {
            return {
                clicks: accumulated.clicks+1,
                cells: [...accumulated.cells,current]
            }
        }, 
            {clicks:0,cells:[]}
        )
        )
    const subscription = click$.subscribe((ev:any) => render(`${ev.clicks} clicks: ${JSON.stringify(ev.cells)}`));
}


export default () => {
    // basicMapOperators();
    // basicTapOperators();
    // basicFirstTakeOperators()
    // basicLastTakeLastSkipOperators()
    basicReduceScanOperators()
}