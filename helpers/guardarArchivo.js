const fs =require('fs');

const guardarDB = (data) =>{
    fs.writeFileSync('./database/data.json', JSON.stringify(data));
    console.log('archivo guardado');
}
const leerDB = () =>{
    
    if(! fs.existsSync('./database/data.json')){
        return null;
    }

    let text = fs.readFileSync('./database/data.json', {encoding:'utf-8'});

    return text;

}

module.exports ={
    guardarDB,
    leerDB
}