const request = require("supertest");
const app = require("./app"); // Path to where your app is defined

describe("GET /mean", () => {
  test("calculates mean of query string numbers", async () => {
    const response = await request(app)
      .get("/mean")
      .query({ nums: "1,2,3,4,5" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ operation: "mean", value: 3 });
  });

  test("validates number input", async () => {
    const response = await request(app)
      .get("/mean")
      .query({ nums: "1,2,three,4" });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("three is not a number");
  });
});

describe("GET /median", () => {
  test("calculates median of query string numbers", async () => {
    const response = await request(app)
      .get("/median")
      .query({ nums: "1,3,5,7" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ operation: "median", value: 4 });
  });
});

describe("GET /mode", () => {
  test("calculates mode of query string numbers", async () => {
    const response = await request(app).get("/mode").query({ nums: "1,2,2,3" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ operation: "mode", value: "2" });
  });
});
