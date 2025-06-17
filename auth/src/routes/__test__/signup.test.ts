//auth/src/routes/__test__/signup.test.ts

import { describe,expect,it } from "vitest"
import request from 'supertest'
import { app } from "../../app"



describe ('Signup test',()=>{
     it ('return 201 on successfull signup',async ()=>{
          const res = await request(app).post('/api/users/signup').send({
               name: 'navas',
               email: 'navas@gmail.com',
               password: 'navas12345',
               confirmPassword: "navas12345"
          });
          
          expect(res.status).toBe(201);
          expect(res.body).include({message: "success"})
     })
})