// import {Button} from "@heroui/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import {Badge, Avatar} from "@heroui/react";
import { GlobeDemo } from "./components/HomePageComponents/GlobeDemo";
import { CoverDemo } from "./components/HomePageComponents/SecSection/SecondSectionDemo";
export default function Home() {
  return (
   <div className="bg-black">
  <GlobeDemo> </GlobeDemo>
  <CoverDemo></CoverDemo>
   </div>
  );
}
