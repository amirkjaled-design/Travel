"use server"

import { prisma } from "../prisma"
import {redirect} from "next/navigation"
import {auth} from "@/auth"



export default async function createTrip(formdata: FormData) {

      const session = await auth()
    
    if(!session || !session.user?.id){
         throw new Error("Not authenticated.");
   } 

const title = formdata.get("title")?.toString()
const description = formdata.get("description")?.toString()
const imageUrl = formdata.get("imageUrl")?.toString()
const startDateStr = formdata.get("startDate")?.toString()
const endDateStr = formdata.get("endDate")?.toString()

if(!title || !description || !startDateStr || !endDateStr){
    return {error: "All fields are required."}
}

const startDate = new Date(startDateStr)
const endDate = new Date(endDateStr)

    await prisma.trip.create({
        data: {
            title,
            description,
            startDate,
            endDate,
            imageUrl: imageUrl || null,
            userId: session.user.id 
        }
    })
    redirect("/trips");
}
