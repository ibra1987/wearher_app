"use client";
import { error } from 'console';
import {useLocale, useTranslations} from 'next-intl';
import { useEffect } from 'react';
 
export default  function HomePage() {

  const t = useTranslations('HomePage');
  const lang = useLocale()

  useEffect(()=>{
    const fetchData = async()=>{
      if(!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(async (position)=>{
        const {latitude:lat,longitude:lon} = position.coords
        const response = await fetch("/api/current",{
          headers:{
            "Content-Type":"application/json"
          },
            method:"POST",
            body:JSON.stringify({lat,lon,lang})
        })
        if(!response.ok){
          console.log(response.statusText)
        }
        return response
      })
    
    }
    fetchData()
  },[])
  return (
    <div>
      <h1>{t('header')}</h1>
    </div>
  );
}