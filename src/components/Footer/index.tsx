import React from 'react'
import Logo from '../../../public/logo.png'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <div style={{color:"#fff" , textShadow:'1px 1px #000', boxShadow:"-4px 8px 33px 0px rgba(0,0,0,0.75)"}} className='w-full flex  flex-col items-center justify-center py-5 mt-5'>
        <p style={{fontSize:'0.8rem'}} >Criado por</p>
       <Link href={"https://adfdeveloper.com.br/"}>
      
        <div className='flex items-center justify-center gap-2'>
            
            <h1 style={{fontFamily:"Carbon", fontSize:'1.2rem', fontWeight:'lighter'}}>ADF Developer</h1>
            <Image src={Logo} width={40} height={40} priority alt='Logo ADF DEveloper' title='Logo ADF Developer'/>
        </div>
       </Link>
    </div>
  )
}

export default Footer