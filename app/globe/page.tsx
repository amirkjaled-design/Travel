
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import Globe, { GlobeMethods } from "react-globe.gl";

export interface TransformedLocation {
    lat: number,
    lng: number,
    name: string,
    country: string
}

export default function GlobePage() {
    const globeRef = useRef<GlobeMethods | undefined>(undefined)
    const [locations, setLocations] = useState<TransformedLocation[]>([])
    const [visited, setVisited] = useState<Set<string>>(new Set())
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("/api/trips/")
                const data = await response.json()
                setLocations(data)
                const countries = new Set<string>(data.map((loc: TransformedLocation) => loc.country))
                setVisited(countries)
                
            } catch (error) {
                console.error("error", error);
            }finally{
                setIsLoading(false)
            }
        }
        fetchLocations()
    }, [])
    useEffect(() => {
        if(globeRef.current){
            globeRef.current.controls().autoRotate = true
            globeRef.current.controls().autoRotateSpeed = 0.5
        }
    }, [])
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-4xl mb-12 font-bold">Your travel journey</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 bg-white rounded-xl overflow-hidden shadow-lg">
                        <div className="p-6">
                            <h2 className="mb-4 font-semibold text-2xl">See where you've been...</h2>
                            <div className="w-full relative h-150">
                                {isLoading ? (<div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fray-900"></div>
                                </div>) : (
                                     <Globe ref={globeRef} globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                backgroundColor="rgba(0,0,0,0)"
                                pointColor={() => "#FF5733"}
                                pointLabel="name"
                                pointsData={locations}
                                pointRadius={0.5}
                                pointAltitude={0.1}
                                pointsMerge={true}
                                width={800}
                                height={600}/>
                                )}
                               
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle>Countries visited</CardTitle>
                            </CardHeader>
                            <CardContent>
                                
                                {isLoading ? (<div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fray-900"></div>
                                </div>) : (
                                    <div className="space-y-4">
                                        <div className="rounded-lg bg-blue-50 p-4">
                                            <p className="text-sm text-blue-800">You've visited
                                                <span className="font-bold">{visited.size}</span> countries
                                            </p>
                                        </div>
                                        <div className="space-y-2 max-h-125 overflow-y-auto pr-2">
                                            {Array.from(visited).sort().map((country, key) => (
                                                <div key={key} className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors border border=gray-100">
                                                    <MapPin className="h-4 w-4 text-red-500"/>
                                                    <span className="font-medium">{country}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
