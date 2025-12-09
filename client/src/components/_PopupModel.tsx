// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Fade from "@mui/material/Fade";
// import Modal from "@mui/material/Modal";
// import Typography from "@mui/material/Typography";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// interface Props {
//   open: boolean;
//   handleClose: () => void;
// }

// export const PopupModel = ({ open, handleClose }: Props) => {
//   return (
//     <Modal
//       aria-labelledby="transition-modal-title"
//       aria-describedby="transition-modal-description"
//       open={open}
//       onClose={handleClose}
//       closeAfterTransition
//       slots={{ backdrop: Backdrop }}
//       slotProps={{
//         backdrop: {
//           timeout: 500,
//         },
//       }}
//     >
//       <Fade in={open}>
//         <Box sx={style}>
//           <Typography id="transition-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="transition-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Fade>
//     </Modal>
//   );
// };
