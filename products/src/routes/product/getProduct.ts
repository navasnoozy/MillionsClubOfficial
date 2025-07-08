import { Router } from "express";

const router = Router()


router.get('/api/products/:id', (req,res)=>{
     res.send('gollam pwoliyo')
     return
});

export { router as getProductRouter}