'use client'

import { Button } from "@/component/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import createTrip from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";



export default function NewTrip() {
    const [isPending, startTransition] = useTransition()
    const [imageUrl, setImageUrl] = useState<string | null>(null)
  return (
    <div className="max-w-lg mx-auto mt-10">
        <Card>
            <CardHeader>New trip</CardHeader>
            <CardContent>
                <form className="space-y-6" action={(formdata: FormData) => { if(imageUrl){ formdata.append("imageUrl", imageUrl)} startTransition(async () => { await createTrip(formdata) }) }}>
                    <label className="block mb-2 text-sm font-medium">Title</label>
                    <input type="text" name="title" placeholder="Paris trip ..." className={cn("w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500")} required/>
                      <label className="block mb-2 text-sm font-medium">Description</label>
                    <textarea name="description" placeholder="Describe your trip ..." className={cn("w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500")} required/>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Start date</label>
                    <input type="date" name="startDate" className={cn("w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500")}/>
                     </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">End date</label>
                    <input type="date" name="endDate" className={cn("w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500")}/>
                </div>
                </div>
                <div>
                    <label>Trip Image</label>
                    {imageUrl && (<Image src={imageUrl} alt="Trip image" className="w-full mb-4 rounded-md object-cover max-h-48" width={300} height={100}/>)}
                    <UploadButton endpoint={"imageUploader"} onClientUploadComplete={(res) => {
                        if(res && res[0].url){
                            setImageUrl(res[0].ufsUrl)
                        }
                        }} 
                        onUploadError={(error: Error) => {
                            console.error("Upload error:", error)
                        }}
                        />
                </div>
                <Button type="submit" disabled={isPending} className="w-full">{isPending ? "Creating..." : "Create Trip"}</Button>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}
