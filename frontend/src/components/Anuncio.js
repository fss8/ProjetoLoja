import { Fragment, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import APIService from './APIService'
import '../styles/output.css'
import '../styles/produtos.css'
import {
  CalendarIcon,
  CheckIcon,
  TrashIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  PencilIcon,
  PlayIcon,
  ArrowCircleUpIcon,
} from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { Context } from '../Context/AuthContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Anuncio({dados, ultimo}) {

  const { user } = useContext(Context)
  const navigate = useNavigate()
  //console.log(ultimo)
  const linkid = dados[0]
  const status = dados[8]
  const editid = '/produtos/' + linkid + '/edit'
  const viewid = '/produtos/' + linkid
  const handleView = () => {
    navigate(viewid)
  }

  const handleEdit = () => {
    navigate(editid)
  }

  //console.log(dados)
  const titulo = dados[2]
  const descricao = dados.descr

  const handlePublicar = () => {
    APIService.Publicar({id:linkid, status:'2', iduser:user.id})
    .then(resp => {
      if(resp === true){
        window.location.reload()
      }
      //console.log(resp)
    }
      )
    .catch(e => console.log(e))
  }

  const handleRetirar = () => {
    APIService.Publicar({id:linkid, status:'1', iduser:user.id})
    .then(resp => {
      if(resp === true){
        window.location.reload()
      }
      //console.log(resp)
    })
    .catch(e => console.log(e))
  }

  const handleDelete = () => {
    APIService.Publicar({id:linkid, status:'4', iduser:user.id})
    .then(resp => {
      if(resp === true){
        window.location.reload()
      }
      //console.log(resp)
    })
    .catch(e => console.log(e))
  }
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {titulo}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <PlayIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {(status === '2') && 'Publicado'}
            {(status === '1') && 'Em edição'}
            {(status === '3' && 'Vendido')}
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            ${dados[4]}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Modificado em {dados[7]}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">

      {(status === '1') ? (
        <span className="hidden sm:block">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleEdit}
        >
          <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          Editar
        </button>
      </span>

      ) :
      (
        <span className="hidden sm:block">
          <button
            type="button"
            disabled={true}
            className="inline-flex items-center rounded-md border border-gray-300 bg-gray-400 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Editar
          </button>
        </span>
      )
      
    }
        

        {(status === '1') ? (
            <span className="ml-3 hidden sm:block">
          <button
            type="button"
            onClick={handleView}
            disabled={true}
            className="inline-flex items-center rounded-md border border-gray-300 bg-gray-400 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Visualizar
          </button>
        </span>
          ) : (
            <span className="ml-3 hidden sm:block">
          <button
            type="button"
            onClick={handleView}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Visualizar
          </button>
        </span>
          )}

    {(status === '1') ? (
        <span className="sm:ml-3">
        <button
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handlePublicar}
        >
          <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Publicar
        </button>
      </span>

    ) :
    (
      (status === '2') ? (
        <span className="sm:ml-3">
          <button
            
            onClick={handleRetirar}
            className="inline-flex items-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            
            <ArrowCircleUpIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Retirar
          </button>
        </span>
      ) :
      (
        <span className="sm:ml-3">
      <button
        disabled={true}
        className="inline-flex items-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Publicar
      </button>
    </span>
      )
    )
    }

    {(status === '1') ? (
      <span className="sm:ml-1 px-3">
      <button name="" id="" className="btn-danger inline-flex items-center rounded-md border border-transparent bg-red-600 px-2 py-2 text-sm font-medium text-white shadow-sm" 
      onClick={handleDelete}
      >Excluir  
      <TrashIcon className="-ml-1 h-5 w-5 trashicon" aria-hidden="true" /></button>
  </span>
    ) : 
    (
      <span className="sm:ml-1 px-3">
      <button name="" id="" className="btn-danger inline-flex items-center rounded-md border border-transparent bg-gray-600 px-2 py-2 text-sm font-medium text-white shadow-sm" 
      disabled={true}
      >Excluir  
      <TrashIcon className="-ml-1 h-5 w-5 trashicon" aria-hidden="true" /></button>
  </span>
    )}

        {/* Dropdown */}
        {(ultimo) ?
          (
            <div className='py-4'>
          <Menu as="div" className="relative ml-3 sobeelem sm:hidden py-5">
          <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            More
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-12 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={editid}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Editar
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={viewid}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Visualizar
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        </div>

          )
        :
        (

          <div className=''>
          <Menu as="div" className="relative ml-3 sm:hidden">
          <Menu.Button className="inline-flex items-center  rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            More
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={editid}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Editar
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={viewid}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Visualizar
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        </div>
        )}
      </div>
    </div>
  )
}
