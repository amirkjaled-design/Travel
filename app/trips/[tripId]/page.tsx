import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import TripDetailClient from "@/component/trip-detail"



export default async function TripDetail({params}: {params: Promise <{tripId: string}>}) {

    const {tripId} = await params

    {/* */}const session = await auth() 

    if(!session){
        return <div>Please sign in first</div>
    }

    const trip = await prisma.trip.findFirst({
        where: {id: tripId,  userId: session.user?.id},
        include: {locations: true}
    })
    console.log(trip)

    if(!trip){
        return <div>Trip not found</div>
    }

  return <TripDetailClient trip={trip} />
  
}
