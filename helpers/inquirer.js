require ('colors');
const inquirer = require('inquirer');
const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message:'¿Que desea hacer?',
        choices: [
            {
                value:'1',
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value:'2',
                name:`${'2.'.green} Historial`
            },
            {
                value:'0',
                name:`${'0.'.green} Salir`
            }     
        ]
    }
];




const inquirerMenu = async() =>{

    console.log('=================================================='.green);
    console.log('Selecciones una opción'.cyan);
    console.log('================================================== \n'.green);

    const opt = await inquirer.prompt(menuOpts);

    return opt;
}
const inquirerMenuOpciones = async(lugares = []) =>{
    let choices= lugares.map((lugar, i) =>{
        const idx = `${i+1}.`.green;
            return {
                value: lugar.id,
                name: `${idx} ${lugar.nombre}`
            }
        });
    choices.push({
        value: 0,
        name: `${0}. ${'Salir.'.green}`
    })
    const menuOpts = [
        {
            type: 'list',
            name: 'id',
            message:'¿Que ciudad elige?',
            choices
        }
    ];

    console.log('=================================================='.green);
    console.log('Selecciones una opción'.cyan);
    console.log('================================================== \n'.green);

    const opt = await inquirer.prompt(menuOpts);

    return opt.id;
}
const pause = async() =>{
    const resp = await inquirer.prompt({
        type: 'input',
        name: 'continuar',
        message:`Presione ${'ENTER'.green} para continuar`
    });
    return resp;
}

const leerInput = async(message) =>{
    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate( value ){
                if (value.length == 0) return 'Por favor ingrese un valor';
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const inquirerCompletarTareas = async(tareasPendientes) =>{
    console.log('=================================================='.green);
    console.log('TAREAS INCOMPLETAS'.cyan);
    console.log('================================================== \n'.green);
    
    let menuTareasIncompletas = [
        {
            type: 'checkbox',
            name: 'tareas',
            message:'¿Que tarea desea completar?',
            choices: [
    
            ]
        }
    ];
    let choicesTareasIncompletas=[];
    Object.keys(tareasPendientes).forEach((key) =>{
        choicesTareasIncompletas.push({
            value:tareasPendientes[key].id,
            name:tareasPendientes[key].descripcion
        })
    });
    menuTareasIncompletas[0].choices=choicesTareasIncompletas;
    let tareasCompletas = [];
    tareasCompletas = await inquirer.prompt(menuTareasIncompletas)


    return tareasCompletas;
}

const inquirerBorrarTarea = async (tareas) =>{

    let choices = [];
    Object.keys(tareas).forEach((key) =>{
        choices.push({
            value:tareas[key].id,
            name:tareas[key].descripcion
        })
    })

    let preguntas = [
        {
            type: 'list',
            name: 'id',
            message:'¿Que tarea desea eliminar?',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async (pregunta) =>{
    let preguntas = [
        {
            type: 'confirm',
            name: 'respuesta',
            message:pregunta
        }
    ];


    return await inquirer.prompt(preguntas);
}

module.exports = {
    inquirerMenu,
    pause,
    leerInput,
    inquirerCompletarTareas,
    inquirerBorrarTarea,
    confirmar,
    inquirerMenuOpciones
}