// auth/src/routes/__test__/signin.test.ts
import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../app";

describe("signin test", () => {
  it("signup for test signin", async () => {
     await request(app).post("/api/users/signup").send({
      name: "jabbar",
      email: "jabbar@gmail.com",
      password: "12345navas",
      confirmPassword: "12345navas",
    });

    const res = await request(app).post("/api/users/signin").send({
      email: "jabbar@gmail.com",
      password: "12345navas",
    });

    expect(res.status).toBe(200);
  });


});
