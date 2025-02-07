import { cn } from "../lib/util";
import React, { useEffect } from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import fetchImageUrl from "../components/fetchImageUrl";

export function  BentoGridDemo({props}:any) {
    console.log("my Props are::::",props);
  
    
    
  return (
    <BentoGrid className="max-w-4xl mx-auto bg-[#04111d] mb-10">
      {props.map(({name,project_id,desc,github_id,video_url,techStack}:any) => (
        <BentoGridItem
          key={project_id}
          title={name}
          description={desc}
          header={github_id}
          icon={video_url}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
