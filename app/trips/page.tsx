import { auth } from "@/auth"
import { Button } from "@/component/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card"
import { prisma } from "@/lib/prisma"
import Link from "next/link"


export default async function Trips() {

    const session = await auth()

    const trips = await prisma.trip.findMany({
        where:{userId: session?.user?.id}
    })
    const sorted = [...trips].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

    const today = new Date()
    today.setHours(0,0,0,0)

    const upcomingTrips = sorted.filter((trip) => new Date(trip.startDate) >= today)
    
    if(!session){
        return <div className="flex justify-center items-center h-screen text-xl text-gray-700">Please sign in to view your trips</div>
   } 
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
        <div className="flex items-center justify-between">
            <h1 className="font-bold tracking-tight text-3xl">Dashboard</h1>
            <Link href={"/trips/new"}>
            <Button>New trip</Button>
            </Link>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Welcome back, {session.user?.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{trips.length === 0 ? "Start planning your first trip by clicking the button above." : `You have ${trips.length} ${trips.length === 1 ? "Trip" : "Trips"} planned. ${upcomingTrips.length > 0 ? `${upcomingTrips.length} upcoming` : ""}`}</p>
            </CardContent>
            </Card>
            <div>
                <h2 className="text-xl font-semibold mb-4">Your recent trips</h2>
                {trips.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <h3 className="text-xl font-medium mb-2">No trips yet</h3>
                            <p className="text-center mb-4 max-w-md">Start your adveture by creating your first trip</p>
                            <Link href={"/trips/new"}>
                            <Button>New trip</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sorted.slice(0, 6).map((trip, key) => (
                        <Link href={`/trips/${trip.id}`} key={key}>
                        <Card className="h-full hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm line-clamp-2 mb-2">{trip.description}</p>
                                <div className="text-sm">
                                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                </div>
                            </CardContent>
                        </Card>
                        </Link>
                    ))}
                </div>
                )}
            </div>
        
    </div>
  )
}
