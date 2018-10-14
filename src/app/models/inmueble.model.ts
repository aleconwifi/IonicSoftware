export class Inmueble {

    constructor (
        public nombre: string,
        public descripcion: string,
        public precio: string,
        public operacion: string,
        public estado: string,
        public img?: string,
        public _id?: string
    ) { }

}