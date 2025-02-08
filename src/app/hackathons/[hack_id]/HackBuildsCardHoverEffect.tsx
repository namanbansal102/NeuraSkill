import { HoverEffect } from "../../components/ui/HackBuildsHoverEffect";
import Web3 from "web3"
import ABI from "../../ABI.json"
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const web3 = new Web3(window.ethereum)
const contractAdd = process.env.NEXT_PUBLIC_CONTRACT_ADD
const contract = new web3.eth.Contract(ABI, contractAdd)
export function HackBuildsCardHoverEffect() {
  const params=useParams();
  console.log("My Params are :::::::::",params);
  
  const [projects, setProjects] = useState([])
  const fetch_builds=async()=>{
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    const userAddress = accounts[0]
    const tx=await contract.methods.get_hack_builds(Number(params["hack_id"])).call({
      from:userAddress
    })
    let arr:any=[];
    for (let i = 0; i < tx.length; i++) {
      const elem = tx[i];
      arr.push({
        build_id:elem.project_id,
        title:elem.name,
        desc:elem.desc
      })
    }
    console.log("my Tx in Hack Build Card Hover Effects ::::::",tx);
    setProjects(arr);
    
  }
  useEffect(() => {
    console.log("My Use Effect is Running");
    
    fetch_builds();
  
  }, [])
  
  return (
    <div className="max-w-5xl mx-auto px-8">
      {projects.length!=0 && 
            <HoverEffect items={projects} />}
      
            {projects.length==0 &&
           <div>
           <center className='text-4xl mt-5 font-bold '>
             No Builds Registered Yet......
             <br />
             
             </center>
             </div>}
    </div>
  );
}