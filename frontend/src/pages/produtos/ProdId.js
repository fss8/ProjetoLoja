import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../Context/AuthContext'
import APIService from '../../components/APIService'
import { ShoppingBagIcon } from '@heroicons/react/solid'
import '../../styles/perfil.css'
import imagem from '../../imagens/store_9.jpg'

function ProdId({id}) {
    const idDoProduto = id

    const [produto, setProduto] = useState('')

    const { user } = useContext(Context)

    const navigate = useNavigate()
    const linkid = produto[0]

    const handleRetireAnuncio = () => {
      APIService.Publicar({id:idDoProduto, status:'1'})
      .then(resp => {
        if(resp === true){
          window.location.reload()
        }
        //console.log(resp)
      }
        )
      .catch(e => console.log(e))
    }

    const handleComprar = () => {
      APIService.ComprarProd({idprod:idDoProduto, iduser:user.id})
      .then(resp => {
        if(resp === true){
          navigate('/meusprodutos')
        }
        //console.log(resp)
      }
        )
      .catch(e => console.log(e))
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/getprodutoid/${idDoProduto}`,{
          'method': 'GET',
          headers:{
            'Content-Type':'application/json'  
          }
        })
        .then(resp => resp.json())
        .then(resp => {
            //console.log(resp)
            
            if(resp[8] === '4' || resp[8] === '1'){
              navigate('/')
            }else{
              setProduto(resp)
            }
            
        }
            )
        .catch(error => console.log(error))
        
      }, [])

  return (
    <div>{produto.length > 0 ? (
        <div> 
        
        <div className="bg-white">
  <div className="pt-6">
    <nav aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <div className="flex items-center">
            <a href="#" className="mr-2 text-sm font-medium text-gray-900">Produtos</a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <a href="#" className="mr-2 text-sm font-medium text-gray-900">{produto[1]}</a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        <li className="text-sm">
          <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{produto[2]}</a>
        </li>
      </ol>
    </nav>

    
    <div className="mx-auto mt-6 max-w-2xl sm:px-2 ">
      <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
        <img src={imagem} className="h-full w-full object-cover object-center"/>
      </div>
      
    </div>

    
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{produto[2]}</h1>
      </div>

      
      <div className="mt-4 lg:row-span-3 lg:mt-0">
        <h2 className="sr-only">Product information</h2>VALOR
        <p className="text-3xl tracking-tight text-gray-900"> R${produto[4]}</p>

        
        <div className="mt-6">
          <h3 className="sr-only">Reviews</h3>
          <div className="flex items-center">
            <div className="flex items-center">
              
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>

              
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>

              
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>

              
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>

              
              <svg className="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="sr-only">4 out of 5 stars</p>
            <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
          </div>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-gray-900">Anunciante:<br/> {produto[9][0]}</p>
        </div>

        <div className="mt-10">
          <p className=" font-medium text-gray-900">Categoria:</p>

          <div className="mt-4">
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              <li className="text-gray-400"><h4 className="text-gray-600">{produto[1]}</h4></li>

              

              </ul>
          </div>
        </div>

        
        { (produto[8] === '3') ? (

          <button  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 py-3 px-8 text-base font-medium text-white 
           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"><ShoppingBagIcon className="-ml-1 h-5 w-12 shopicon " aria-hidden="true" /> 
          Produto Comprado</button>


        )  :  (user.id === produto[5]) ? 
        <button  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 py-3 px-8 text-base font-medium text-white 
         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleRetireAnuncio}
        >Retirar Anuncio</button>
                                 : 
                                 
        <button  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white 
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleComprar}
        ><ShoppingBagIcon className="-ml-1 h-5 w-12 shopicon " aria-hidden="true"/> Adquirir</button>
        

        }
        
        </div>

      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
        
        <div>
            <h3 className="text-sm font-medium text-gray-900">Descrição</h3>

          <div className="space-y-6">
            <p className="text-base text-gray-900">{produto[3]}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

          <div className="mt-4">
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              <li className="text-gray-400"><span className="text-gray-600">Hand cut and sewn locally</span></li>

              <li className="text-gray-400"><span className="text-gray-600">Dyed with our proprietary colors</span></li>

              </ul>
          </div>
        </div>

        <div className="border-t border-gray-200"/>

        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900">Última atualização</h3>

          <div className="mt-4">
            {produto[7]}
          </div>
        </div>

        
      </div>
    </div>
  </div>
</div>


         </div>
    ) :
       <a>Página não encontrada</a> 
    }

        
    </div>
  )
}

export default ProdId