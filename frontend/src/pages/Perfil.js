import { PaperClipIcon } from '@heroicons/react/solid'
import '../styles/perfil.css'
import {
    CogIcon,
  } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/AuthContext'


export default function Perfil() {
    const navigate = useNavigate()
    const { user } = useContext(Context)

    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
      fetch(`http://127.0.0.1:5000/getpessoa/${user.id}`,{
        'method': 'GET',
        headers:{
          'Content-Type':'application/json'  
        }
      })
      .then(resp => resp.json())
      .then(resp => {
          //console.log(resp)
          setPessoa(resp)
          
        })
      .catch(error => console.log(error))
      
    }, [])
  return (
    <div>

      {pessoa.length > 0 ? 
      (
        <div>
        

        <div className="md:container md:mx-auto">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Perfil do usuário</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and information.</p>
                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                  </svg>
                                </span>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Nome Completo</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{pessoa[0]}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{pessoa[3]}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">CPF</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{pessoa[2]}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{pessoa[1]}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Data de nascimento</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {pessoa[5]}
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Produtos</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      Ultimo produto cadastrado: {pessoa[9]} <br/>
                      Primeiro produto cadastrado: {pessoa[8]} <br/>
                      Quantidade de produtos cadastrados : {pessoa[10]} </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Pedidos</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      Ultimo pedido feito: {pessoa[12]} <br/>
                      Primeiro pedido feito: {pessoa[11]} <br/>
                      Quantidade de pedidos feitos: {pessoa[13]} </dd>
                  </div>
                  

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Editar Perfil</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> 
                    <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 py-6 px-1 flex items-center">
                                <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                </span>
                                <button name="" id="" className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-2 py-2 text-sm font-medium text-white shadow-sm
                                    " 
                                    onClick={() => navigate('/editperfil')}
                                    >Configurar  
                                    <CogIcon className="-ml-1 h-5 w-5 trashicon" aria-hidden="true" />
                                    </button>
                        
                              </div>

                              
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
        </div>

        </div>
      )
      
      :
      (
        <div> Pessoa não encontrada</div>
        )
    
    }
    </div>
    
  )
}
