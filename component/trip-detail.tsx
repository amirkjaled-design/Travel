"use client"

import { Trip, Location } from "@/app/generated/prisma/client"
import Image from "next/image"
import { Calendar, MapPin, Plus} from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useState } from "react"
import Map from "./map"
import SortableItenirary from "./sortable-itenirary"

export type TripWithLocation = Trip & {
    locations: Location[],
  
}

interface Tripdetailclientprops{
    trip: TripWithLocation
}

export default function TripDetailClient({trip}: Tripdetailclientprops) {
    const [activeTab, setActiveTab] = useState("overview")
    
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">{trip.imageUrl && ( 
    <div className="h-72 w-full md:h-96 overflow-hidden rounded-xl shadow-lg relative">
        <Image src={trip.imageUrl} alt={trip.title} fill priority className="object-cover"/>
    </div>
    )}
    <div className="bg-white p-6 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
            <h1 className="font-extrabold text-4xl text-gray-900">{trip.title}</h1>
            <div className="flex text-gray-500 items-center mt-2">
                <Calendar className="h-5 w-5 mr-2"/>
                <span className="text-lg">{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</span>
            </div>
        </div>
        <div className="mt-2 md:mt-0">
            <Link href={`/trips/${trip.id}/itenirary/new`}>
            <Button>
                <Plus className="h-5 w-5" />
                Add location
            </Button>
            </Link>
        </div>
    </div>
    <div className="bg-white rounded-lg shadow p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
                <TabsTrigger value="overview" className="text-lg">Overview</TabsTrigger>
                <TabsTrigger value="itenirary" className="text-lg">Itenirary</TabsTrigger>
                <TabsTrigger value="map" className="text-lg">Map</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-semibold md-4 text-2xl">Trip Summary</h2>
                        <div className="space-y-4">
                            <div className="items-start flex">
                                <Calendar className="h-6 w-6 mr-2 text-gray-500"/>
                                <div>
                                    <p className="font-medium text-gray-700">Dates</p>
                                    <p className="text-sm text-gray-500">
                                        {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                                        <br/>
                                        {`${Math.round((trip.startDate.getTime() - trip.endDate.getTime()) / (1000 * 60 * 60 * 24))} days(s)`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="h-6 w-6 text-gray-500" />
                                <div>
                                    <p>Destination</p>
                                    <p>{trip.locations.length}{trip.locations.length === 1 ? "location" : "locations"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-72 rounded-lg shadow overflow-hidden">
                        <Map iteniraries={trip.locations}></Map>
                    </div>
                    {trip.locations.length === 0 && (
                        <div className="text-center p-4">
                            <p>Add locations to see them on the map</p>
                             <Link href={`/trips/${trip.id}/itenirary/new`}>
                            <Button>
                            <Plus className="h-5 w-5 mr-2" />
                                Add location
                            </Button>
                            </Link>
                        </div>
                    )}
                    <div>
                        <p className="text-gray-500 leading-relaxed">{trip.description}</p>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="itenirary" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Full itenirary</h2>
                </div>
                 {trip.locations.length === 0 ? (
                        <div className="text-center p-4">
                            <p>Add locations to see them on the itenirary</p>
                             <Link href={`/trips/${trip.id}/itenirary/new`}>
                            <Button>
                            <Plus className="h-5 w-5 mr-2" />
                                Add location
                            </Button>
                            </Link>
                        </div>
                    ) : (
                        <SortableItenirary locations={trip.locations} tripId={trip.id} />
                    )}
            </TabsContent>
               <TabsContent value="map" className="space-y-6">
            <div className="h-72 rounded-lg overflow-hidden shadow">
              <Map iteniraries={trip.locations} />
            </div>
            {trip.locations.length === 0 && (
              <div className="text-center p-4">
                <p>Add locations to see them on the map.</p>
                <Link href={`/trips/${trip.id}/itinerary/new`}>
                  <Button>
                    {" "}
                    <Plus className="mr-2 h-5 w-5" /> Add Location
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
    </div>
    <div className="text-center">
        <Link href={"/trips"}>
        <Button>Back to trips</Button>
        </Link>
    </div>
    </div>
  )
}
