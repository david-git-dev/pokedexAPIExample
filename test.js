const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName= document.getElementById('pokemon-name');
const pokemonId= document.getElementById('pokemon-id');
const weight= document.getElementById('weight');
const height= document.getElementById('height');
const typesSpan= document.getElementById('types');
const hp= document.getElementById('hp');
const attack= document.getElementById('attack');
const defense= document.getElementById('defense');
const specialAttack= document.getElementById('special-attack');
const specialDefense= document.getElementById('special-defense');
const speed= document.getElementById('speed');
const swipperWrapper = document.querySelector('.swiper-wrapper')
searchButton.addEventListener('click',getPokemonByIdOrName)
searchInput.addEventListener('keydown', (event) =>{
  if (event.key === 'Enter') {
    getPokemonByIdOrName()
  }
});
async function getPokemonByIdOrName(){
    const namePokemonOrId = searchInput.value.toLowerCase();
    namePokemonOrId
        const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${namePokemonOrId}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const data = await response.json();
          pokemonName.textContent = data.name.toUpperCase()
          pokemonId.textContent=`#${data.id}`
          weight.textContent= `Weight: ${data.weight} kg`
          height.textContent= `Height: ${data.height} m`
          hp.textContent= `HP: ${data.stats.find(prop=> prop.stat.name=='hp').base_stat}`
          attack.textContent= `Attack: ${data.stats.find(prop=> prop.stat.name=='attack').base_stat}`
          defense.textContent= `Special Attack:  ${data.stats.find(prop=> prop.stat.name=='defense').base_stat}`
          specialAttack.textContent= `Defense: ${data.stats.find(prop=> prop.stat.name=='special-attack').base_stat}`
          specialDefense.textContent= `Special Defense:  ${data.stats.find(prop=> prop.stat.name=='special-defense').base_stat}`
          speed.textContent= `Speed:  ${data.stats.find(prop=> prop.stat.name=='speed').base_stat}`

          const sprites = Object.entries(data.sprites).reverse()
          const front = sprites.filter((sprite,index) => index%2===0)
          const back = sprites.filter((sprite,index)=>index%2!==0)
         const newOrderSprites = [...front,...back]
         swipperWrapper.innerHTML=''
         typesSpan.innerHTML=''
         getTypes(newOrderSprites,data.types)
        } catch (error) {
          //alert should appear with the text "Pokémon not found"
          
          alert('Pokémon not found')
        }
}
document.addEventListener('DOMContentLoaded', function() {
  new Swiper('.swiper-container', {
      loop: true,
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });
});
function getTypes(sprites,types){
  sprites.forEach(sprite=>swipperWrapper.innerHTML+= ` <div class="swiper-slide">
    <img src="${sprite[1]}" alt="Product image 1" class="w-full h-full object-cover" id="sprite">
    </div>`)
types.forEach(data=>{
typesSpan.innerHTML+=`<span class="inline-block text-white px-4 py-2 rounded-full ${data.type.name}">${data.type.name}</span>`
})
}