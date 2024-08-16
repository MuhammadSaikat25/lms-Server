import {Router} from 'express'
import { orderController, stripePk } from './order.controller'
import { auth } from '../../middleware/auth'
const router=Router()



router.post('/order',auth('admin',"user"),orderController.createOrder)
router.get('/get-allOrder',auth("admin",),orderController.getAllOrderByAdmin)
router.get('/payment/stripePk',stripePk)
router.post('/payment',auth('user','admin'),orderController.payment)
export const orderRouter=router