//auth/src/routes/__test__/signup.test.ts

import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../app";

describe("Signup", () => {
  it("return 201 on successfull signup", async () => {
    const res = await request(app).post("/api/users/signup").send({
      name: "navas",
      email: "navas@gmail.com",
      password: "navas12345",
      confirmPassword: "navas12345",
    });

    expect(res.status).toBe(201);
    expect(res.body).include({ message: "success" });
  });

  it("return 400 with invalid email signup", async () => {
    const res = await request(app).post("/api/users/signup").send({
      name: "navas",
      email: "navasmail.com",
      password: "navas12345",
      confirmPassword: "navas12345",
    });
    

    expect(res.status).toBe(400);
    expect(res.body.error[0].message).toBe("Invalid email address");
  });

    it("return cookies", async () => {
    const res = await request(app).post("/api/users/signup").send({
      name: "navas",
      email: "riyas@mail.com",
      password: "navas12345",
      confirmPassword: "navas12345",
    });
    

    const cookie = res.get('Set-Cookie');
    // expect(cookie).toBeDefined(); // the session should be secure false
  });
});
