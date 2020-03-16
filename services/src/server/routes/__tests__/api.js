import request from "supertest";

import app from "#root/server/app";

describe("/admin_only", () => {
  it("shows 401 when requesting with no headers (unmocked)", async () => {
    jest.unmock("firebase-admin");
    await request(app)
      .get("/api/admin_only")
      .then(response => {
        expect(response.status).toBe(401);
      });
  });

  it("shows 200 when requesting as admin (mocked)", async () => {
    jest.mock("firebase-admin");
    await request(app)
      .get("/api/admin_only")
      .set("Authorization", "GIVE_ME_200")
      .then(response => {
        expect(response.status).toBe(200);
      });
  });

  it("shows 401 when requesting as non-admin (mocked)", async () => {
    jest.mock("firebase-admin");
    await request(app)
      .get("/api/admin_only")
      .set("Authorization", "GIVE_ME_401")
      .then(response => {
        expect(response.status).toBe(401);
      });
  });
});
