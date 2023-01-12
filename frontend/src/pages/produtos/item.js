import React from 'react'
import imagem from '../../imagens/store_9.jpg'
import { useNavigate } from 'react-router-dom'

function Item({dados}) {
   const produtos = dados
   const navigate = useNavigate()

   const handleProduto = (e) => {
    //console.log(e.target.id)
    if(e.target.id !== ''){
        const path = /produtos/ + e.target.id
        navigate(path)
    }
   }
  return (
    <>

        {produtos.map(function(object, i){
            if(i % 2 === 0){
                return (
                
                <div key={i} id={object[0]} className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-4 flex justify-center items-center"
                    onClick={handleProduto}
                >
                    <img className="group-hover:opacity-60 transition duration-500" id={object[0]} src={imagem} alt="sofa-2" />
                    <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
                        <div>
                            <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600" id={object[0]}>{object[2]}</p>
                        </div>
                        <div>
                            <p className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800" id={object[0]}>R${object[4]}</p>

                            <div className="mt-4" id={object[0]}>
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    <li className="text-gray-500"><span className="group-hover:opacity-60 transition" >{object[1]}</span></li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    <div className="group-hover:opacity-60 transition duration-500 absolute bottom-8 right-8 flex justify-start items-start flex-row space-x-2">
                        <button className="bg-white border rounded-full focus:bg-gray-800 border-gray-600 p-1.5" />
                        <button className="bg-white border rounded-full focus:bg-gray-800 border-gray-600 p-1.5" />
                    </div>
                    
                </div>

                )

            }else{
                return (
                <div key={i} id={object[0]}  className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-4 flex justify-center items-center"
                onClick={handleProduto}
                >
                    <img className="group-hover:opacity-60 transition duration-500"  id={object[0]} src={imagem} alt="sofa-3" />
                    <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
                        <div>
                            <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600" id={object[0]}>{object[2]}</p>
                        </div>
                        <div>
                            <p className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800" id={object[0]} >R${object[4]}</p>

                            <div className="mt-4" id={object[0]}>
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    <li className="text-gray-500"><span className="group-hover:opacity-60 transition">{object[1]}</span></li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    <div className="group-hover:opacity-60 transition duration-500 absolute bottom-8 right-8 flex justify-start items-start flex-row space-x-2">
                        <button className="bg-white border rounded-full focus:bg-gray-800 border-gray-600 p-1.5" />
                        <button className="bg-white border rounded-full focus:bg-gray-800 border-gray-600 p-1.5" />
                    </div>
                    
                </div>

                )
            }
        })}        

    </>
  )
}

export default Item