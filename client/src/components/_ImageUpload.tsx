// import { useState, type ChangeEvent } from "react";
// import { Button } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

// interface Props {
//   id: string;
// }

// const ImageUpload = ({ id }: Props) => {
//   const [fileName, setFileName] = useState<string[]>([]);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const newFile = event.target.files[0].name;
//       setFileName((prev) => [...prev, newFile]);
//     }
//   };

//   return (
//     <>
//       <input
//         accept="image/*"
//         style={{ display: "none" }}
//         id={id}
//         type="file"
//         onChange={handleFileChange}
//       />

//       {/* Center button */}
//       <label
//         htmlFor={id}
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           zIndex: 10,
//         }}
//       >
//         <Button
//           variant="contained"
//           component="span"
//           sx={{
//             borderRadius: "50%",
//             minWidth: "50px",
//             height: "50px",
//             backgroundColor: "rgba(0,0,0,0.6)",
//           }}
//         >
//           <AddPhotoAlternateIcon color="action"/>
//         </Button>
//       </label>
//     </>
//   );
// };

// export default ImageUpload;