const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr(){

        const listado = [];
        //llenar arreglo, con la key permite retornar todas las llaves
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
            
        })
        // console.log(`tales ${listado}`);
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }


    //estraer tarea y ponerlo en el listadp
    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc =''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        
        console.log();
        this.listadoArr.forEach((element,index)=> {
            let TheColor = ''
            const idx = ` ${index + 1}`.green;
           
            if (element.completadoEn !== null) {

                TheColor = 'Completado'.green
                console.log(`${idx} ${element.desc} ${'::'.red} ${TheColor}`);

            }else{

                TheColor = 'Pendiente'.red
                console.log(`${idx} ${element.desc} ${'::'.red} ${TheColor}`);
            }

        
        });
    }

    listarPendientesCompletadas(completadas){

        console.log();
        let index = 0;
        this.listadoArr.forEach(element => {
           
            const {desc,completadoEn} = element;
            const estado = (completadoEn) ? 'Completada'.green :'Pendiente'.red
           
            if (completadas) {
                    
                if (completadoEn){
                    index +=1;
                    console.log(`${(index + '.').green} ${desc} ${'::'.red} ${completadoEn.green}`);
                }
                
            }else{
                    
                if (!completadoEn){

                    index +=1;
                    console.log(`${(index + '.').red} ${desc} ${'::'.red} ${estado}`);

                }
            }
           
        });
    }

    toggleCompletadas(ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toDateString()
            }
        });

        this.listadoArr.forEach(tarea =>{
            if (!ids.includes(tarea.id)) { //si no existe o incluye
               this._listado[tarea.id].completadoEn = null;
            }
        });
    }
    
}

module.exports = Tareas;