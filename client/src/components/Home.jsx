import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { filter, filterByType, getAllPokemons, getTypes } from "../redux/actions"
import Card from "./Card"
import Searchbar from "./Searchbar"
import {  orderByName, orderByStrength } from "../redux/actions";




// de selene
import { Paginado } from "./Paginado"
import { Link } from "react-router-dom"
export  function Home(){
const dispatch = useDispatch()
const pokemons = useSelector(state=>state.pokemons)
const types = useSelector(state=>state.types)
const [orden, setOrden]= useState('')
const[filtro,setFilter]=useState('')
//--------------------------------------------------------------------------------------------------------
//paginado en el front segun selene
const[currentPage, setCurrentPage] = useState(1)
const[pokemonsPerPage, ] = useState(12)
const indexOfLastPokemon = currentPage * pokemonsPerPage
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
const currentPokemons = pokemons.slice(indexOfFirstPokemon,indexOfLastPokemon)

const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber)
}

//--------------------------------------------------------------------------------------------------------


function handleSortByName(e){
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
    
}
useEffect(()=>{
    dispatch(getAllPokemons())
    },[dispatch])

useEffect(()=>{
    dispatch(getTypes())
    },[dispatch])



function handleSortByStrength(e){
    e.preventDefault()
    dispatch(orderByStrength(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
    
}

function handleFilterByType(e){
    e.preventDefault()
    dispatch(filterByType(e.target.value))
    setCurrentPage(1)
    //setFilter(`Filtrado ${e.target.value}`)
}

function handleFilter(e){
    e.preventDefault()
    dispatch(filter(e.target.value))
    setCurrentPage(1)
}

return (
    <div>
        <h1>Pokemons</h1>
        <Link to = '/createpokemons'>
        <button>Create your Pokemon</button>
        </Link>
        {/* oredenamiento sin modularizar por nombre  */}
        <Searchbar/>
        <select onChange={e=>handleSortByName(e)}>
            <option >All</option>
            <option value="asc">a to z</option>
            <option value="des">z to a</option>
        </select>
        {/* oredenamiento sin modularizar por fuerza */}
        <select onChange={e=>handleSortByStrength(e)}>
            <option >All</option>
           
            <option value="asc">mas debil</option>
            <option value="des">mas fuerte</option>
        </select>
        {/* Filttro por tipo  */}
        <select onChange={e=>handleFilterByType(e)}>
            <option value="All">All</option>
            {types.map((t)=>(
                <option value = {t.name}>{t.name}</option>
                ))}            
        </select>
  {/* Filttro por existente o creado  */}
  <select onChange={e=>handleFilter(e)}>
            <option value="all">All</option>
            <option value="existing">Existing</option>
            <option value="created">Created</option>
                      
        </select>

        <Paginado
        pokemonsPerPage={pokemonsPerPage}
        pokemons={pokemons.length}
        paginado= {paginado}
    />
           <div>    
        {
        currentPokemons.length?currentPokemons.map(e=>{
            return (
                <Link to = {`/pokemons/${e.id}`}>
                <Card name={e.name} image={e.image} type={e.type}/>           
                </Link>
          )}):<img src="http://gifgifs.com/animations/creatures-cartoons/pokemon/Sleeping.gif"></img>
          
         }
         </div>
         <Paginado
        pokemonsPerPage={pokemonsPerPage}
        pokemons={pokemons.length}
        paginado= {paginado}
    />

    </div>
    )
}

 export default Home