import Web3 from "web3"
import ABI from "../ABI.json"
import { AbiItem } from 'web3-utils';

export const BOTCHAIN_CONTRACT_ADDRESS = "0xd21fedFACC94d82722b7f4Ad67927E941B98787A"

export const getBotchainFeeOptions = async (web3: any) => {
  const latestBlock = await web3.eth.getBlock("latest")
  const maxPriorityFeePerGas = web3.utils.toWei("20", "gwei")
  const baseFeePerGas = latestBlock.baseFeePerGas || "0"
  const maxFeePerGas = web3.utils.toBN(baseFeePerGas).add(web3.utils.toBN(maxPriorityFeePerGas)).toString()

  return { maxPriorityFeePerGas, maxFeePerGas }
}

const fetchContract=():any=>{
    let  contract;
    let web3;
    if (typeof window !== "undefined") {
      web3 = new Web3(window.ethereum)
      const storedAddress = localStorage.getItem("CONTRACT_ADD")
      const contractAdd = storedAddress === BOTCHAIN_CONTRACT_ADDRESS
        ? storedAddress
        : BOTCHAIN_CONTRACT_ADDRESS
      localStorage.setItem("CONTRACT_ADD", contractAdd)
      console.log("My Contract address from Navbar is:::",contractAdd);  
      const formattedABI: AbiItem[] = JSON.parse(JSON.stringify(ABI));
      contract = new web3.eth.Contract(formattedABI, contractAdd)
      return contract;
    }
}
export default fetchContract