const url = 'https://pokeapi.co/api/v2/pokemon/'

function search_pokemon() {
    let poke_name = document.getElementById('get-name').value;

    poke_name = poke_name.trim().toLowerCase();

    // poke_name = 'pikachu';

    if(! poke_name){
        alert('Por favor escribe un nombre de Pokemon');
        return;

    }else if (poke_name.length > 30){
        alert('Oye oye el nombre de tu pokemon es muy largo');
        return;
    }

    request_pokemon(poke_name)

}

function request_pokemon(poke_name) {

    let url_full = url+poke_name;

    console.log(url_full)

    fetch(url_full).then((response) => {
        
        if(response.status != 200){
            // alert('Ha ocurrido un error al consultar tu pokemon: '+poke_name);
            return null;
        }

        return response.json()
    }).then((data) => {
        console.log('Data response')
        console.log(data)

        if(! data){
            pokemon_not_found();
            alert(`El pokemon ${poke_name} no ha sido localizado`);
            return;
        }

        set_data_pokemon(data)

    })
}

function set_data_pokemon(data_pokemon){
    let height   = document.getElementById('set-height');
    let weight   = document.getElementById('set-weight');
    let type     = document.getElementById('set-type');
    let number   = document.getElementById('set-number');
    let name     = document.getElementById('set-name');
    let get_name = document.getElementById('get-name');
    let image    = document.getElementById('img-pokemon');

    height.innerHTML   = data_pokemon.height+' m';
    weight.innerHTML   = data_pokemon.weight+' Kg';
    type.innerHTML     = data_pokemon.types[0].type.name;
    number.innerHTML   = data_pokemon.id;
    name.innerHTML     = data_pokemon.name;
    image.src          = data_pokemon.sprites.front_default
    get_name.value     = '';
    console.log('Set data pokemon OK')
}

function pokemon_not_found() {
    let img_content = document.getElementById('img-pokemon');
    img_content.src = 'assets/img/pokemon_not_found.png'
    clear_texts();
    console.log('Set img default OK')
}

function clear_texts() {
    [
        'set-height',
        'set-weight',
        'set-type',
        'set-number',
        'set-name',
        'get-name'
    ].forEach((id) => {
        let element = document.getElementById(id);
        if(! element){
            console.log(`Not found element: ${id}`);
        }else{
            element.value = ''
        }
    });

    console.log('Clear elements OK');
}