"use client"

import { motion } from "framer-motion"
import { Heart, Eye, Share2, MoreHorizontal, Check, EclipseIcon as Ethereum } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Web3 from "web3"
import { CardHoverEffectDemo } from "../../CardHoverEffectDemo"
import ABI from "../../../../ABI.json"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"
import { CarouselDemo } from "../../carouse."
import { HackBuildsCardHoverEffect } from "../../HackBuildsCardHoverEffect"

const web3 = new Web3(window.ethereum)
const contractAdd = process.env.NEXT_PUBLIC_CONTRACT_ADD
const contract = new web3.eth.Contract(ABI, contractAdd)

interface BuildDetails {
  upvotes: number
  name: string
  techStack: string
  desc: string
  video_url: string
  github_id: string
  team: string[]
}

export default function NFTDetails() {
  const searchParams = useParams()
  const [hackDetails, setHackDetails] = useState<BuildDetails>({
    upvotes: 0,
    name: "NeoxLifeChain",
    techStack: "Next React BERN",
    desc: "NeoxLifeChain is a revolutionary blockchain-based healthcare management system that securely stores and manages patient records, streamlines medical processes, and enhances data interoperability among healthcare providers.",
    video_url: "",
    github_id: "",
    team: ["0x1234...5678", "0x5678...9ABC", "0x9ABC...DEF0"],
  })

  useEffect(() => {
    fetchBuild()
  }, [])

  const fetchBuild = async () => {
    try {
      const project_id = Number(searchParams.project_id)
      const build_data = await contract.methods.fetch_build(project_id).call()
      setHackDetails(build_data)
    } catch (error) {
      toast.error("Error fetching build details")
    }
  }

  const upvoteProjects = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const userAddress = accounts[0]
      const hack_id = Number(searchParams.hack_id)
      const project_id = Number(searchParams.project_id)
      const tx = await contract.methods.upvoteProject(hack_id, project_id).send({
        from: userAddress,
        value: 2,
        gasLimit: 3000000,
      })
      toast.success("Project upvoted successfully!")
    } catch (error) {
      toast.error("Error upvoting project")
    }
  }

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
          <Image
            src="https://i.seadn.io/gae/WzLu2XrkTLS1yZU_AcYp0HHDWYPUhc7lGhwa8Ho39WP2RfJrV0GtaNrmPWK0o5mYbPnV-60VSoYIEYrf9cHS77Vnd_3dYm0h2bW5GA?auto=format&dpr=1&w=1000"
            alt="Clash Of Codes 2.0"
            width={1000}
            height={1000}
            className="w-full h-auto transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        {/* Right Column - Details */}
        <motion.div {...fadeIn} className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{hackDetails.name}</h1>
              <div className="flex items-center gap-4 text-gray-400 mt-2">
                <span className="flex items-center gap-1">
                  <Eye size={16} />
                  72 views
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={16} />
                  {hackDetails.upvotes} upvotes
                </span>
              </div>
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

          {/* Description */}
          <p className="text-gray-300">{hackDetails.desc}</p>

          {/* Technologies Used */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {hackDetails.techStack.split(" ").map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <motion.div className="bg-gray-900 rounded-xl p-6 border border-gray-800" {...fadeIn}>
            <h2 className="text-xl font-bold mb-4">Team Members</h2>
            <div className="space-y-4">
              {hackDetails.team.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ethereum className="text-blue-500" />
                    <span>{member}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">Verified</span>
                    <Check className="text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upvote Button */}
          <motion.button
            {...glowEffect}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={upvoteProjects}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold relative overflow-hidden"
          >
            <span className="relative z-10">Upvote Project</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-50"
              
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Latest Builds Section */}
      <div className="mt-16">
        <h2 className="text-5xl font-bold text-center mb-8">
          Our Latest <span className="text-blue-600">Builds</span>
        </h2>
        <CardHoverEffectDemo></CardHoverEffectDemo>
        <CarouselDemo></CarouselDemo>
      </div>
    </div>
  )
}

