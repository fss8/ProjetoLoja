import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import APIService from "../../components/APIService"
import { Context } from "../../Context/AuthContext"

export default function EditProduto({id}) {
    const idprod = id
    //console.log(idprod)

    const { user } = useContext(Context)
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('Imóveis')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')

  const handleNome = (event) => {
    const value = event.target.value
    setNome(value)
  }
  const handleTipo = (event) => {
      const value = event.target.value
      setTipo(value)
  }
  const handleDescricao = (event) => {
      const value = event.target.value
      setDescricao(value)
  }
  const handleValor = (event) => {
    const value = event.target.value
    setValor(value)
  }
  const handleSubmit = (event) => {

    event.preventDefault()
    
    APIService.InserirProd({nome, tipo, descricao, valor, userid:user.id, linhaespecifica:idprod})
    .then(resp => {
        //console.log(resp)
        if(resp === true){
          navigate('/meusanuncios')
        }
    })
    .catch(e => console.log(e))
  }
    return (
      <>
        
  
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
  
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Product Information</h3>
                <p className="mt-1 text-sm text-gray-600">Área de edição de anuncio</p>PRODUTO: {idprod}

              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    
                  <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                          Nome
                        </label>
                        <input
                          value={nome} onChange={handleNome}
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                  <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="tipoprod" className="block text-sm font-medium text-gray-700">
                          Tipo
                        </label>
                        <select
                           value={tipo} onChange={handleTipo}
                          id="tipoprod"
                          name="tipoprod"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>Imóveis</option>
                          <option>Eletrônicos</option>
                          <option>Serviços</option>
                          <option>Moda</option>
                        </select>
                      </div>
                      
  
                    <div>
                      <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                        Descrição
                      </label>
                      <div className="mt-1">
                        <textarea
                          value={descricao} onChange={handleDescricao}
                          id="descricao"
                          name="descricao"
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Caneta bic com tampa verde..."
                          
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Breve descrição das características do produto
                      </p>
                    </div>
  
                    <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="valorprod" className="block text-sm font-medium text-gray-700">
                          Valor
                        </label>
                        <input
                          value={valor} onChange={handleValor}
                          type="number"
                          name="valorprod"
                          id="valorprod"
                          
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Enviar fotos do produto</label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      onClick={handleSubmit}
                      disabled={nome.length < 3 || descricao === ''}
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Editar Anúncio
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
  
        
      </>
    )
  }
  