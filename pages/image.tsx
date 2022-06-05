import axios from "axios";
import { useEffect, useState } from "react";
// import Uppy from "@uppy/core";
// import Tus from "@uppy/tus";
// import { DragDrop } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";

import type { ColorCount } from "../types/color";

// TODO implement this once parsing images is working

// const uppy = new Uppy({
//   meta: { type: "avatar" },
//   restrictions: { maxNumberOfFiles: 1 },
//   autoProceed: true,
// });

// uppy.use(Tus, { endpoint: "/upload" });

// uppy.on("complete", (result) => {
//   const url = result.successful[0].uploadURL;
//   console.log("url: ", url);
// });

// const AvatarPicker = ({ currentAvatar }) => {
//   return (
//     <div>
//       <img src={currentAvatar} alt="Current Avatar" />
//       <DragDrop
//         uppy={uppy}
//         locale={{
//           strings: {
//             // Text to show on the droppable area.
//             // `%{browse}` is replaced with a link that opens the system file selection dialog.
//             dropHereOr: "Drop here or %{browse}",
//             // Used as the label for the link that opens the system file selection dialog.
//             browse: "browse",
//           },
//         }}
//       />
//     </div>
//   );
// };

const Images = () => {
  const [colors, setColors] = useState<ColorCount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Component loads data on mount

  useEffect(() => {
    const getColors = async () => {
      try {
        const { data } = await axios.get("/api/image");
        setColors(data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    getColors();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {colors.map((color) => (
        <div
          style={{
            backgroundColor: `rgb(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b})`,
          }}
        >
          {color.count}
        </div>
      ))}
    </>
  );
};

export default Images;
