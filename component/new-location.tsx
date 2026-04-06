"use client"

import { useTransition } from "react"
import addLocation from "@/lib/actions/add-location"
import { Button } from "./ui/button"

export default function NewLocationClient({tripId}: {tripId: string}) {
  const [isPending, startTransition] = useTransition()
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-lg p-8 shadow-lg bg-white">
            <h1 className="mb-6 text-3xl font-bold text-center">Add new Location</h1>
            <form className="space-y-6" action={(formdata: FormData) => {
              startTransition(() => {
                addLocation(formdata, tripId)
              })
              
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input name="address" type="text" required className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <Button type="submit" className="w-full">{isPending ? "Adding..." : "Add location"}</Button>
            </form>
          </div>
        </div>
    </div>
  )
}
