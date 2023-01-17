import React from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import {  useEffect, useState } from "react";
import {InfinitySpin} from "react-loader-spinner";
import Image from 'react-bootstrap/Image';


const PORTFOLIO_URL = process.env.REACT_APP_MSA_URL || "http://localhost:3001" ;

export default function ProductPage() {

    const {id} = useParams();
    const [project,setProject] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
   

    useEffect(() => {
        getProject();
    }, []);
   
    const getProject = () => {
        axios.get(`${PORTFOLIO_URL}/projects/${id}`)
            .then(response => {
                setProject(response.data);
                setIsLoading(false);
            })        
            .catch(err => {
                console.log(err);
            })
    }


    return(
        <div>
            {isLoading ? (
                <InfinitySpin
                    width="80"
                    color="#4fa94d"
                />
            ) : (        
                <section id='home' className='min-h-screen text-center mt-4 flex flex-col justify-center '>
                <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-56 h-56 relative overflow-hidden md:h-96 md:w-96 mb-2">
                <Image rounded="true" width="620px" height="370px" src={project.image}></Image>
                </div>
                <h1 className='text-3xl md:text-5xl font-medium text-teal-500'>{project.name}</h1>
                <p className='text-md py-1 text-gray-800 md:text-xl'>{project.description} </p>
                
            </section>
            )}
        </div>
      
    )
}
