import request from "supertest";

import app from "#root/server/app";

describe("/autocomplete", () => {
  it("returns an array in the correct format", async () => {
    await request(app)
      .get("/google-maps/autocomplete")
      .query({ input: "sydney" })
      .then(response => {
        expect(response.body.predictions).toBeInstanceOf(Array);
        expect(response.body.status).toBe("OK");
      });
  });
});
