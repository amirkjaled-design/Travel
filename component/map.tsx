"use client"


import { Location } from "@/app/generated/prisma/client"
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"


interface MapProps {
    iteniraries: Location[],
    setCenter?: (center: {lat: number, lng: number}) => void
}

export default function Map({iteniraries, setCenter}: MapProps ) {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    })
    if(!isLoaded) return <div>Loading maps ...</div>
    if(loadError) return <div>Error loading maps</div>
    const center = iteniraries.length > 0 ? {lat: iteniraries[0].lat ?? 0, lng: iteniraries[0].lng ?? 0} : {lat: 0, lng: 0}
  return (
    <GoogleMap center={center} mapContainerStyle={{width: "100%", height: "100%"}} zoom={2}>
        {iteniraries.map((location, key) => (
            <Marker key={key} position={{lat: location.lat ?? 0, lng: location.lng ?? 0}} title={location.locationTitle}/>
        ))}
    </GoogleMap>
  )
}
