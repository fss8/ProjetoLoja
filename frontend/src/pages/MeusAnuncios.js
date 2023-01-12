import React, { useState, useEffect} from 'react'
import Anuncio from '../components/Anuncio'
import { Context } from '../Context/AuthContext'
import { useContext } from 'react'

function MeusAnuncios() {
    
    const { user } = useContext(Context)
    //console.log(user)
    

    const [prods, setProds] = useState([])
    const [ultimo, setUltimo] = useState()

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/getprods/${user.id}`,{
          'method': 'GET',
          headers:{
            'Content-Type':'application/json'  
          }
        })
        .then(resp => resp.json())
        .then(resp => {
            setUltimo(resp.length-1)
            setProds(resp)})
        .catch(error => console.log(error))
        
      }, [])




  return (

    <div className="md:container md:mx-auto">

<div className="md:container md:mx-auto">
  <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        FILIPE SAMUEL (NOME)
      </div>
      <div className="border-t border-gray-200">
        <dl>

        {prods.map(function(object, i){
            if(i % 2 === 0){
                return <div key={object} className="bg-white px-4 py-4"><Anuncio dados={object} ultimo={(i === ultimo)}/></div>
            }else{
                return <div key={object} className="bg-gray-50 px-4 py-4"><Anuncio dados={object} ultimo={(i === ultimo)}/></div>
            }
        })}
          
          
          </dl>

          </div>
    
    </div>

    </div>
</div>
    
  )
}

export default MeusAnuncios