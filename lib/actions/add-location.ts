

'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

async function geoCodeAddress(address: string){
    const apiKey = process.env.GOOGLE_MAPS_KEY!
    const response = await fetch( `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`)

    const data = await response.json()

    const { lat, lng} = data.results[0]?.geometry?.location || {}

    return { lat, lng}
}

export default async function addLocation(formdata: FormData, tripId: string) {
    const session = await auth()

    if(!session){
        throw new Error("Unauthorized")
    }
    const address = formdata.get("address")?.toString()
    if(!address){
        throw new Error ("Missing Address")
    }

    const { lat, lng} = await geoCodeAddress(address)

    const count = await prisma.location.count({
        where:{tripId}
    })
    console.log("Location data:", { tripId, lng, lat })

    await prisma.location?.create({
        data:{
            locationTitle:address,
            lat: parseFloat(lat) || 0,
            lng: parseFloat(lng) || 0,
            tripId,
            order: count
        }
    })
 
    
    redirect(`/trips/${tripId}`)
}
