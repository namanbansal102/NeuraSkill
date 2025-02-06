"use client"

import { motion } from "framer-motion"
import { Heart, Eye, Share2, MoreHorizontal } from "lucide-react"
import { use, useState } from "react"
import Web3 from "web3"
import { CarouselDemo } from "./carouse."
import { CardHoverEffectDemo } from "./CardHoverEffectDemo"
import ABI from "../../../../ABI.json"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
const web3 = new Web3(window.ethereum)
const contractAdd = "0x704a1a668207407E5667AFfC402641F1aE2196da"
const contract = new web3.eth.Contract(ABI, contractAdd)
interface build_details {
  upvotes:number,
  name:string,
  techStack:string,
  desc:string,
  video_url:string,
  github_id:string,
  team:[string]
}
export default function NFTDetails() {
  const searchParams=useParams();
  const [hack_details, setHack_details] = useState<build_details>({
    upvotes:0,
    name:"",
    techStack:"",
    desc:"",
    video_url:"",
    github_id:"",
    team:[""]
  })
  console.log("My Params are::::",searchParams);
  const fetchBuild=async ()=>{
    try{
      const project_id=Number(searchParams.project_id);
      const build_data=await contract.methods.fetch_build(project_id).call()
    }
    catch(error){
      toast.error(error)
    }
  }
  const upvoteProjects=async ()=>{
    try {
      console.log("UpVote Projects is Running");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const userAddress = accounts[0]
      const hack_id=Number(searchParams.hack_id);
      const project_id=Number(searchParams.project_id);
      const tx=await contract.methods.upvoteProject(hack_id,project_id).send({
        from:userAddress,
        value: 2,
        gasLimit: 3000000,

      })
      console.log("My Transaction is::::::",tx);
      
    
    } catch (error) {
      toast.error(error);
    }
    
    
  }
  const handleSubmitBuild=async ()=>{
    try{

      console.log("UpVote Project is Running ");
      const hack_id=Number(searchParams.hack_id);
      const project_id=Number(searchParams.project_id);
      const tx=await contract.methods.submitbuild(hack_id,project_id).send(
        {
          from:userAddress
        }
      )
      console.log("My Transaction is::::::::::",tx);
      
      // const router=useRouter();
      toast.success("Build Registered Successfully.")
    }

    catch(err){
      console.log("Error is:::",err);
      toast.error(err)
      
    }
  
    
    
  }
  const [isFavorited, setIsFavorited] = useState(false)

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const glowEffect = {
    initial: { boxShadow: "0 0 0 rgba(59, 130, 246, 0)" },
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(168, 85, 247, 0.4)",
        "0 0 20px rgba(59, 130, 246, 0.3)",
      ],
    },
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <motion.div {...fadeIn} className="rounded-2xl overflow-hidden border border-gray-800">
          <img
            src="https://i.seadn.io/gae/WzLu2XrkTLS1yZU_AcYp0HHDWYPUhc7lGhwa8Ho39WP2RfJrV0GtaNrmPWK0o5mYbPnV-60VSoYIEYrf9cHS77Vnd_3dYm0h2bW5GA?auto=format&dpr=1&w=1000"
            alt="Clash Of Codes 2.0"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Right Column - Details */}
        <motion.div {...fadeIn} className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">NeoxLifeChain</h1>
              <div className="flex items-center gap-4 text-gray-400 mt-2">
                <span className="flex items-center gap-1">
                  <Eye size={16} />
                  72 views
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={16} />8 favorites
                </span>
              </div>
              <br />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis velit alias quos, dolore laudantium illum unde iusto, ut suscipit consequuntur dolor ex aut facilis itaque minus cupiditate. Asperiores dolor nesciunt dolores corporis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam unde explicabo voluptatem?
              </span>
            </div>
            <div className="flex gap-2">
            
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                <Share2 size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                <MoreHorizontal size={20} />
              </motion.button>
            </div>
          </div>
          <ul className="list-disc">
          <h1 className="text-2xl font-bold text-blue-600">Technologies Used</h1>
          <li className="ml-2">Next Js</li>
          <li className="ml-2">React Js</li>
          <li className="ml-2">BERN Stack</li>
          </ul>
          {/* Best Offer Section */}
          <motion.div className="bg-gray-900 rounded-xl p-6 border border-gray-800" {...fadeIn}>
            <h2 className="text-sm text-gray-400 mb-2">Best offer</h2>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">0.002 WETH</p>
                <p className="text-gray-400">≈ $5.49</p>
              </div>
              <motion.button
                {...glowEffect}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={upvoteProjects}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold"
              >
                Upvote
              </motion.button>
            </div>
          </motion.div>

          {/* Listings Section */}
          <motion.div className="bg-gray-900 rounded-xl p-6 border border-gray-800" {...fadeIn}>
            <h2 className="text-xl font-bold mb-4">Listings</h2>
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="text-left pb-4">Price</th>
                  <th className="text-left pb-4">USD Price</th>
                  <th className="text-left pb-4">Quantity</th>
                  <th className="text-left pb-4">Expiration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">0.002 WETH</td>
                  <td className="py-2">$5.49</td>
                  <td className="py-2">2</td>
                  <td className="py-2">in 5 hours</td>
                </tr>
                <tr>
                  <td className="py-2">0.0018 WETH</td>
                  <td className="py-2">$4.94</td>
                  <td className="py-2">1</td>
                  <td className="py-2">in 27 days</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          {/* Submit Build Button */}
          <motion.button
            {...glowEffect}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmitBuild}
            className="w-full py-4 bg-gradient-to-r from-blue-600  to-purple-600 rounded-xl font-bold text-lg shadow-lg"
          >
           Submit Build
          </motion.button>
      
        </motion.div>
      </div>
      <center>
      <h1 className="text-white text-5xl mt-10 font-bold">Our Latest 
        <span className="text-blue-600">
            
            {" "}Builds
            </span> 
            </h1>
      </center>
      <CardHoverEffectDemo></CardHoverEffectDemo>
      <CarouselDemo></CarouselDemo>
    </div>
  )
}

