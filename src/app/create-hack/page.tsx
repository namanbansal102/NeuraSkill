"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileUpload } from "../components/file-upload"
import { TraitInput } from "../components/trait-input"

interface Trait {
  id: string
  type: string
  value: string
}

export default function CreateNFT() {
  const [file, setFile] = useState<File | null>(null)
  const [traits, setTraits] = useState<Trait[]>([])
  const [formData, setFormData] = useState({
    collection: "",
    name: "",
    supply: "1",
    description: "",
    externalLink: "",
  })

  const handleAddTrait = () => {
    setTraits([...traits, { id: Math.random().toString(), type: "", value: "" }])
  }

  const handleRemoveTrait = (id: string) => {
    setTraits(traits.filter((trait) => trait.id !== id))
  }

  const handleTraitChange = (id: string, field: "type" | "value", value: string) => {
    setTraits(traits.map((trait) => (trait.id === id ? { ...trait, [field]: value } : trait)))
  }

  return (
    <div className="min-h-screen bg-[#04111d] text-white p-8 mt-15">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Create an NFT</h1>
        <p className="text-gray-400 mb-8">
          Once your item is minted you will not be able to change any of its information.
        </p>

        <div className="grid gap-8">
          <FileUpload onFileSelect={(f) => setFile(f)} />

          <div className="space-y-6">
            <div>
              <label className="block mb-2">
                Collection <span className="text-red-500">*</span>
              </label>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center gap-2 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-lg">+</span>
                Create a new collection
              </motion.button>
            </div>

            {["name", "supply", "description", "externalLink"].map((field) => (
              <motion.div key={field} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <label className="block mb-2 capitalize">
                  {field === "externalLink" ? "External link" : field}
                  {field === "name" && <span className="text-red-500">*</span>}
                </label>
                {field === "description" ? (
                  <textarea
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    placeholder={`Enter a ${field}`}
                    className="w-full h-32 bg-white/5 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type={field === "supply" ? "number" : "text"}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    placeholder={field === "externalLink" ? "https://collection.io/item/123" : `Enter ${field}`}
                    className="w-full bg-white/5 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </motion.div>
            ))}

            <TraitInput
              traits={traits}
              onAdd={handleAddTrait}
              onRemove={handleRemoveTrait}
              onChange={handleTraitChange}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

