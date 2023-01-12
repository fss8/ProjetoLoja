import React, { useState, useEffect } from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import Item from "./item";


export default function Index() {

    const [dados, setDados] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5000/getprodutos',{
          'method': 'GET',
          headers:{
            'Content-Type':'application/json'  
          }
        })
        .then(resp => resp.json())
        .then(resp => {
            //console.log(resp)
            setDados(resp)})
        .catch(error => console.log(error))
        
      }, [])

    return (
        <div className="mx-auto container px-6 xl:px-0 py-12">
            <div className="flex flex-col">
                <div className="flex flex-col justify-center">
                    <div className="relative">
                        <img className="hidden sm:block w-full" src="https://i.ibb.co/HxXSY0j/jason-wang-Nx-Awry-Abt-Iw-unsplash-1-1.png" alt="sofa" />
                        <img className="sm:hidden w-full" src="https://i.ibb.co/B6qwqPT/jason-wang-Nx-Awry-Abt-Iw-unsplash-1.png" alt="sofa" />
                        <div className="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start">
                            <p className="text-3xl sm:text-4xl font-semibold leading-9 text-white">Range Comfort Sofas</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
                    <Item dados={dados}/>
                </div>
                
            </div>
        </div>
    );
}