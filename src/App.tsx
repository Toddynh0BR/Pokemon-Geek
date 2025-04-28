import { useState, useEffect, useRef } from 'react';

import Swal from 'sweetalert2';
import * as S from './styles';

import { FaSearch, FaArrowUp } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import axios from 'axios';

import Logo from "./assets/Pokemon Logo.png";
import Gifs from "./assets/gifs.mp4";
import LIGHT from "./assets/Light.png";

import Bottom from "./assets/Bottom.png";
import Shadow from "./assets/shadow.png";
import RedLight from "./assets/hover shine.avif";

import LoadingSvg from "./assets/loading.svg";
import withReactContent from 'sweetalert2-react-content';

import normal from "./assets/icons/normal.svg";
import fire from "./assets/icons/fire.svg";
import water from "./assets/icons/water.svg";
import electric from "./assets/icons/electric.svg";
import grass from "./assets/icons/grass.svg";
import ice from "./assets/icons/ice.svg";
import fighting from "./assets/icons/fighting.svg";
import poison from "./assets/icons/poison.svg";
import ground from "./assets/icons/ground.svg";
import flying from "./assets/icons/flying.svg";
import psychic from "./assets/icons/psychic.svg";
import bug from "./assets/icons/bug.svg";
import rock from "./assets/icons/rock.svg";
import ghost from "./assets/icons/ghost.svg";
import dragon from "./assets/icons/dragon.svg";
import dark from "./assets/icons/dark.svg";
import steel from "./assets/icons/steel.svg";
import fairy from "./assets/icons/fairy.svg";

const typeIcons = {
  normal,
  fire,
  water,
  electric,
  grass,
  ice,
  fighting,
  poison,
  ground,
  flying,
  psychic,
  bug,
  rock,
  ghost,
  dragon,
  dark,
  steel,
  fairy,
};

type Color = 'black' | 'blue' | 'brown' | 'gray' | 'green' | 'pink' | 'purple' | 'red' | 'white' | 'yellow';
const colorMap: { [key in Color]: { main: string; dark: string } } = {
  black: {
    main: "#333333",
    dark: "#000000"
  },
  blue: {
    main: "#59caff",
    dark: "#072e90"
  },
  brown: {
    main: "#f7773c",
    dark: "#4e2004"
  },
  gray: {
    main: "#d0d0d0",
    dark: "#4e4d4d"
  },
  green: {
    main: "#6fff1c",
    dark: "#194e05"
  },
  pink: {
    main: "#ffa4b6",
    dark: "#bc2649"
  },
  purple: {
    main: "#ef4cec",
    dark: "#520854"
  },
  red: {
    main: "#ffaa00",
    dark: "#6d2709"
  },
  white: {
    main: "#ffffff",
    dark: "#a0a0a0"
  },
  yellow: {
    main: "#ffcc00",
    dark: "#7c6400"
  }
};

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonData {
  id: number;
  name: string;
  img: string;
  color: Color;
  description: string;
  types: PokemonType[];
  gif: string;
}

interface EvolutionData {
  id: number;
  name: string;
  sprite: string;
  number: number;
}

const MySwal1 = withReactContent(Swal);

function App() {
 const [stage, setStage] = useState(1);//estagio da pagina
 const [search, setSearch] = useState<'false' | 'searching' | 'true'>('false');
 const [query, setQuery] = useState<string>('');
 const [emFoco, setEmFoco] = useState<boolean>(false);
 const [pokemon, setPokemon] = useState<PokemonData | null>(null);
 const [evolutions, setEvolutions] = useState<EvolutionData[]>([]);
 const [tutorial, setTutorial] = useState<number>(0);

 const audioCath = useRef(new Audio('/sounds/catchPoke.mp3'));
 const audioWait = useRef(new Audio('/sounds/pokeWaiting.mp3'));
 const audioOpen = useRef(new Audio('/sounds/openPoke.mp3'));
 const audioReturn = useRef(new Audio('/sounds/returnPoke.mp3'));

 const colors = pokemon ? colorMap[pokemon.color] || {
  main: "#ccc",
  dark: "#999"
} : {
  main: "#ccc",
  dark: "#999"
} 

 function handleFocus() {
  setEmFoco(true);
 };

 function handleBlur() {
  if(query !== "") {
    setEmFoco(true);

  } else {
    setEmFoco(false); 
  }
 };
//1025
 async function HandleSearch() {
  if (query.trim() === "") return;

  try {
    setSearch('searching')
    setEmFoco(false)

    const pokeRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${query}`);
    const evoRes = await axios.get(speciesRes.data.evolution_chain.url);
    const evolutionData = evoRes.data;
    console.log(pokeRes)

    const flavorTexts = speciesRes.data.flavor_text_entries;
    const ptBrEntry = flavorTexts.find((entry: { language: { name: string; }; }) => entry.language.name === "pt-BR");
    const enEntry = flavorTexts.find((entry: { language: { name: string; }; }) => entry.language.name === "en");
  
    // Selecionar a descrição disponível
    const description = ptBrEntry
      ? ptBrEntry.flavor_text
      : enEntry
      ? enEntry.flavor_text
      : "Descrição não disponível.";
  
    // Limpar quebras de linha e caracteres especiais
    const cleanDescription = description.replace(/[\n\f]/g, ' ');

    const evoNames: any[] = [];
    const traverseEvolution = (node: { species: { name: any; }; evolves_to: any[]; }) => {
      evoNames.push(node.species.name);
      if (node.evolves_to.length > 0) {
        node.evolves_to.forEach(evolution => traverseEvolution(evolution));
      }
    };
    traverseEvolution(evolutionData.chain);
    let number = 0

    // Obter detalhes de cada Pokémon na cadeia de evolução
    const evoDetails = await Promise.all(evoNames.map(async (name) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) throw new Error(`Dados não encontrados para ${name}`);
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.versions['generation-v']['black-white'].animated.front_default ? 
         data.sprites.versions['generation-v']['black-white'].animated.front_default
        :
         data.sprites.other.showdown.front_default ?
         data.sprites.other.showdown.front_default :
         data.sprites.front_default
        ,
        number: number += 1
      };
    }));
    console.log(evoDetails)

    setEvolutions(evoDetails);

    setPokemon({
      id: pokeRes.data.id,
      name: pokeRes.data.name,
      img: 
      pokeRes.data.sprites.other.home.front_default ? 
      pokeRes.data.sprites.other.home.front_default :
      pokeRes.data.sprites.other.dream_world.front_default ?
      pokeRes.data.sprites.other.dream_world.front_default :
      pokeRes.data.sprites.other.official_artwork.front_default ?
      pokeRes.data.sprites.other.official_artwork.front_default :
      pokeRes.data.sprites.front_default,
      color: speciesRes.data.color.name,
      description: cleanDescription,
      types: pokeRes.data.types,
      gif: `https://play.pokemonshowdown.com/sprites/ani/${pokeRes.data.name}.gif`
    });
    
    audioCath.current.play();
    setSearch('true')
    if (tutorial == 1) {
      setTutorial(2)
    }
  }catch(error: any) {
    if (error) {
      alert('Pokemon não encontrado');
    }
     console.error(error);
     setSearch('false')
  }
 };

 async function HandleChange(pokeName: string): Promise<void>{
  try {

    const pokeRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`);
    const evoRes = await axios.get(speciesRes.data.evolution_chain.url);
    const evolutionData = evoRes.data;

    const flavorTexts = speciesRes.data.flavor_text_entries;
    const ptBrEntry = flavorTexts.find((entry: { language: { name: string; }; }) => entry.language.name === "pt-BR");
    const enEntry = flavorTexts.find((entry: { language: { name: string; }; }) => entry.language.name === "en");
  
    // Selecionar a descrição disponível
    const description = ptBrEntry
      ? ptBrEntry.flavor_text
      : enEntry
      ? enEntry.flavor_text
      : "Descrição não disponível.";
  
    // Limpar quebras de linha e caracteres especiais
    const cleanDescription = description.replace(/[\n\f]/g, ' ');

    const evoNames: any[] = [];
    const traverseEvolution = (node: { species: { name: any; }; evolves_to: any[]; }) => {
      evoNames.push(node.species.name);
      if (node.evolves_to.length > 0) {
        node.evolves_to.forEach(evolution => traverseEvolution(evolution));
      }
    };
    traverseEvolution(evolutionData.chain);
    let number = 0

    // Obter detalhes de cada Pokémon na cadeia de evolução
    const evoDetails = await Promise.all(evoNames.map(async (name) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) throw new Error(`Dados não encontrados para ${name}`);
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.versions['generation-v']['black-white'].animated.front_default ? 
         data.sprites.versions['generation-v']['black-white'].animated.front_default
        :
         data.sprites.other.showdown.front_default ?
         data.sprites.other.showdown.front_default :
         data.sprites.front_default
        ,
        number: number += 1
      };
    }));


    setEvolutions(evoDetails);

    setPokemon({
      id: pokeRes.data.id,
      name: pokeRes.data.name,
      img: 
      pokeRes.data.sprites.other.home.front_default ? 
      pokeRes.data.sprites.other.home.front_default :
      pokeRes.data.sprites.other.dream_world.front_default ?
      pokeRes.data.sprites.other.dream_world.front_default :
      pokeRes.data.sprites.other.official_artwork.front_default ?
      pokeRes.data.sprites.other.official_artwork.front_default :
      pokeRes.data.sprites.front_default,
      color: speciesRes.data.color.name,
      description: cleanDescription,
      types: pokeRes.data.types,
      gif: `https://play.pokemonshowdown.com/sprites/ani/${pokeRes.data.name}.gif`
    });
    
  }catch(error: any) {
    if (error) {
      alert('Pokemon não encontrado');
    }
     console.error(error);
     setSearch('false')
  }
 };

 useEffect(()=> {
  const Tutorial = localStorage.getItem('@tutorial');
  
  if(Tutorial != 'feito' && tutorial == 0) {
    setTutorial(1)

    MySwal1.fire({
      html: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="/icon.svg" alt="Ícone de sucesso" width="20" height="20" />
        <p style="margin: 0; font-size: 1.4rem;  font-family: 'Roboto', sans-serif;">Digite o nome de um pokemon ou um numero de 1 a 1025</p>
      </div>
      `,
      position: "top-end",
      toast: true,
      width: 500,
      showConfirmButton: false,
      timer: tutorial >= 2 ? 100: 1000000,
      timerProgressBar: true,
      customClass: {
        popup: 'swal1'
      }
    });
  }

  if (tutorial == 2 || tutorial == 3 && Tutorial != "feito") {
    
    MySwal1.fire({
      html: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="/icon.svg" alt="Ícone de sucesso" width="20" height="20" />
        <p style="margin: 0; font-size: 1.4rem;  font-family: 'Roboto', sans-serif;">Clique na Pokebola</p>
      </div>
      `,
      position: "top-end",
      toast: true,
      width: 300,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: 'swal1'
      }
    });
  }
 },[tutorial])

 useEffect(() => {
  if (stage == 1 && pokemon) {
    const audio = audioWait.current;
    audio.volume = 0.5; 
    audio.loop = true; // faz o som ficar tocando em loop
    audio.play();

    return () => {
      audio.pause();     // pausa o áudio quando stage mudar
      audio.currentTime = 0; // reseta o áudio
    };
  }
}, [stage, pokemon]);

  return (
   <S.Container data-search={search} data-stage={stage}>
    <video 
   autoPlay
   muted
   loop
   playsInline
  >
    <source src={Gifs} type="video/mp4" />
    </video>
    <div className="opacity"></div>

    <div className="firstPage">
      <img src={Logo} alt="" className='Logo'/>

      <h1>ESCOLHA SEU POKEMON!</h1>

      <div className="pokeball" onClick={()=> {
        if (!pokemon) return;
        setStage(2);
        setTutorial(3)
  
        audioOpen.current.volume = 0.5;
        audioOpen.current.play()
        localStorage.setItem('@tutorial', 'feito')
        setTimeout(()=> {
          setStage(3)
        }, 1500)
      }}>
       <div className="TOP">
        <img src={RedLight} alt="" />
       </div>
       <img src={LIGHT} alt="" className='LIGHT'/>
       <img src={Bottom} alt="" className='BOTTOM' />
       <img src={Shadow} alt="" className='SHADOW'/>
      </div>

      <S.InputWapper data-focused={emFoco} data-search={search}>
        <input 
         placeholder='Digite o nome do Pokemon' 
         onChange={(e) => setQuery(e.target.value)}
         onFocus={handleFocus} 
         onBlur={handleBlur}
         type="text"  
         value={query}
        />

        <div className="search" onClick={HandleSearch}>
         {
          search == 'false' ?
          <FaSearch size={18} color='#fff'/>
          :
          search == 'searching' ?
          <img src={LoadingSvg} alt="" className='loading'/>
          :
          search == 'true' ?
          <FaArrowUp size={18} color='#fff'/>
          :
          <FaSearch size={18} color='#fff'/>
         }
        </div>
      </S.InputWapper>
    </div>

    <div className="me">
      <p>Feito por <a href="https://portfolio-toddy.netlify.app/" target="_blank">Toddynh0BR</a></p>
    </div>

    <S.Background 
    isActive={stage}
  
     style={{background: `linear-gradient(to bottom, ${colors.main}, ${colors.dark})`}}
    ></S.Background>
     

     <S.PokeInfo isActive={stage} >
      <div className="header">
       <img src={Logo} alt="" className='Logo'/>

       <div className="close" onClick={()=> {
        setStage(0);
        setSearch('false');
        setQuery('');
        setEmFoco(false);
        audioReturn.current.play()
        setTimeout(()=> {
          setPokemon(null)
          setStage(1)
          setEvolutions([])
        }, 1500)
       }}>
        <div className="circle1" style={{background: `linear-gradient(to bottom, ${colors.main}, ${colors.dark})`}}>
         <FiX size={25} color='#000'/>
        </div>
        <div className="circle2" style={{background: `linear-gradient(to bottom, ${colors.main}, ${colors.dark})`}}></div>
       </div>
      </div>

      <main>
      <div className="left">
       <img src={pokemon && pokemon.img ? pokemon.img : ' '} alt="EastEgg" />
      </div>

      <div className="right">
       <h2>{pokemon && pokemon.id ? `#${String(pokemon.id).padStart(3, "0")}` : ' '}</h2>
       <h1>{pokemon && pokemon.name ? pokemon.name : ' '}</h1>
       <p>{pokemon && pokemon.description ? pokemon.description : ' '}</p>

       <h3>ELEMENTOS:</h3>
       <div className="elements">
        {pokemon && pokemon.types ? pokemon.types.length ? pokemon.types.map((item, index)=> (
          <div key={index} className={`icon ${item.type.name}`}>
            <img src={typeIcons[item.type.name as keyof typeof typeIcons]} alt="" />
          </div>
        )) : null : null }
       </div>
       
       { evolutions.length ? 
        <h3>EVOLUÇÕES:</h3>
       :
        null
       }

      
       { evolutions.length ?
        <div className="evolutions">
          {
            evolutions.map((item, index)=> (
              <div 
               key={item.id} 
               className={`evo poke${index += 1} ${item.name == pokemon?.name ? 'this' : ''}`} 
               style={{background: `radial-gradient(circle,${colors.main} 30%, ${colors.dark} 100%)`}}
               onClick={()=> {
                HandleChange(item.name)
               }}
               >
               <img src={item.sprite} alt="" />
               
              </div>
             ))
          }
        </div>
       :
        null
       }
      </div>
      </main>
     </S.PokeInfo>

   </S.Container>
  )
}

export default App
