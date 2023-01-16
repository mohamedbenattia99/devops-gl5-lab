import React from 'react';
import Image from 'react-bootstrap/Image';
import {AiFillLinkedin, AiFillGithub, AiFillInstagram, AiFillMail} from 'react-icons/ai'


const Profile = ({ profile }) => (
    

    <section id='home' className='min-h-screen text-center mt-4 flex flex-col justify-center '>
        <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-56 h-56 relative overflow-hidden md:h-96 md:w-96 mb-2">
        <Image roundedCircle="true" width="320px" height="270px" src={profile.image}></Image>
        </div>
        <h1 className='text-3xl md:text-5xl font-medium text-teal-500'>{profile.name}</h1>
        <h3 className='text-xl md:text-2xl'>{profile.position}</h3>
        <p className='text-md py-1 text-gray-800 md:text-xl'>{profile.description} </p>
        <div className='text-5xl py-4 flex justify-center gap-16 text-gray-600'>
           <AiFillLinkedin size={60}/> 
            <AiFillGithub size={60}/>
            <AiFillInstagram size={60}/>
            <AiFillMail size={60} />
        </div>
    </section>

)

export default React.memo(Profile);