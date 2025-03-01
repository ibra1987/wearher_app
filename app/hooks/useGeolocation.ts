import { Coordinates } from "@/types";
import { useEffect, useState } from "react";

interface GeolocationState {
  loading: boolean;
  error: string | null;
  coordinates: Coordinates | null;
}

export default function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    loading: true,
    error: null,
    coordinates: null,
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationData((prev) => ({
        ...prev,
        loading: false,
        error: "Votre navigateur ne supporte pas la géolocalisation.",
      }));
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setLocationData({
        loading: false,
        error: null,
        coordinates: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      });
    },(error)=>{
        let errorMesage : string;
        switch(error.code){
            case error.PERMISSION_DENIED:
                errorMesage = "Accès à la géolocalisation non autorisé, merci de l'activer."
                break
            case error.POSITION_UNAVAILABLE:
                errorMesage = "Impossible de récuperer le données de géolcalisation."
                break;
            case error.TIMEOUT:
                    errorMesage = "La requete de géolocalisation à pris beaucoup de temps."
                    break;
            default :
                errorMesage = "Une erreur est survenue."

        }
        setLocationData({loading:false, error:errorMesage, coordinates:null})
    },{
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge:0
    });
  };

  useEffect(()=>{getLocation()},[])
  return {
    ...locationData,
    getLocation,
  };
}
