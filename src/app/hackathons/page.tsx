"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Web3 from "web3"
import ABI from "../ABI.json";
import Image from "next/image"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import fetchImageUrl from "../components/fetchImageUrl";
const web3 = new Web3(window.ethereum)
const contractAdd = process.env.NEXT_PUBLIC_CONTRACT_ADD;

const contract = new web3.eth.Contract(ABI , contractAdd)
console.log("My Contract is::::",contract);


export default function DropsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [hackathons_arr, setHackathons_arr] = useState([]);
  const router=useRouter();
  const fetch_hackathons=async ()=>{
    
    try{
      console.log("Fetch hacakthons calling");

      const fetch_hackathon=await contract.methods.allHackathons().call();
      console.log("My Hackathons Fetched Are::::",fetch_hackathon);
      setHackathons_arr(fetch_hackathon)
      
    }
    catch(error){
      
      toast.error("Error Fetching Hackathons");
    }
  
  }
  useEffect(() => {
    console.log("use Effect Running ");
    
    fetch_hackathons();
    console.log("After Function Calling");
    
  }, [])
  
  return (
    <div className="min-h-screen bg-[#04111d] text-white p-8 mt-16">
      <h1 className="text-5xl font-bold mb-8">Our Hacakthons</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === "active" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Active & upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === "past" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Past
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons_arr.map(({hack_id,img_url,mode,prizePool,st_date,end_date,title}) => (
          <motion.div
            key={hack_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer "
          >
            {/* Image */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={fetchImageUrl(img_url) || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* {drop.isOnchain && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-300" />
                  Onchain Daily
                </div>
              )} */}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">{title}</h3>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-400">Online</p>
                  <p className="font-bold">{st_date} to {end_date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Prize</p>
                  <p className="font-medium">{prizePool}</p>
                </div>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
              <motion.button
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white text-black font-semibold px-6 py-2 rounded-lg"
                onClick={()=>{
                  console.log("On Click Button Clicked");
                  router.push(`/hackathons/${hack_id}`)
                }}
              >
                View Drop
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

