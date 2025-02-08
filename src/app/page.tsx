// import {Button} from "@heroui/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import {Badge, Avatar} from "@heroui/react";
import { GlobeDemo } from "./components/HomePageComponents/GlobeDemo";
import { CoverDemo } from "./components/HomePageComponents/SecSection/SecondSectionDemo";
import { WobbleCardDemo } from "./components/HomePageComponents/ThirdSection/WobbleCardDemo";
import { InfiniteMovingCards } from "./components/HomePageComponents/FourthSection/infinite-moving-cards";
import { InfiniteMovingCardsDemo } from "./components/HomePageComponents/FourthSection/InfiniteCardsDemo";
import { FocusCardsDemo } from "./components/HomePageComponents/FifthSection/FocusCardsDemo";0
export default function Home() {
  return (

   <div className="bg-black ">
  <GlobeDemo> </GlobeDemo>
  <div className="h-7"></div>
  <CoverDemo></CoverDemo>
  <div className="h-10"></div>
  <WobbleCardDemo></WobbleCardDemo>

  <div className="h-20"></div>
  <FocusCardsDemo></FocusCardsDemo>
  <InfiniteMovingCardsDemo></InfiniteMovingCardsDemo>
   </div>
  );
}
