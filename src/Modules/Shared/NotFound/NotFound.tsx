import Box from "@mui/material/Box";
import notFound from '../../../Images/notfound.png'

export default function NotFound() {
  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <img src={notFound} alt="not found" width={'80%'}/>
    </Box>
  )
}
