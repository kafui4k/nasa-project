const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "USS Enterprise",
    rockect: "Falcon Heavy",
    target: "LEO",
    launchDate: "January 15, 2028",
  };

  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rockect: "Falcon Heavy",
    target: "LEO",
  };

  const launchDataWitInvalidtDate = {
    mission: "USS Enterprise",
    rockect: "Falcon Heavy",
    target: "LEO",
    launchDate: "zoot",
  };

  test("should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("should catch each missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error:
        "Bad Reques: Unable to add new Launch, Missing required launch details",
    });
  });

  test("should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWitInvalidtDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
