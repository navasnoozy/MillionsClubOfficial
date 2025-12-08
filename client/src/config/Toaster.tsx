//src/config/Toaster.ts
import { useTheme } from '@mui/material/styles';
import { Toaster as Sonner } from "sonner";

const Toaster = () => {
 const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
     
  return <Sonner richColors 
//   toastOptions={{
//     style:{
//       border:
//     }
//   }
// }  
/>;
};

export default Toaster;
