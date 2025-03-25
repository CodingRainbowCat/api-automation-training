import "dotenv/config";
import { StaffService } from "../base/StaffService.js";
import { Staff } from "../models/Staff.js";
import { should } from 'chai';
should();

const staffService = new StaffService();

describe("Staff Tests", function () {

    let authConfig = {};

    before (async function () {
        authConfig = await staffService.authenticate();
    });

    it("@Smoke - Get all - Success case", async function () {
        const response = await staffService.getAllStaff(authConfig);
        const staff = response.data as Staff[];
        response.status.should.equal(200, JSON.stringify(response.data));
        staff.should.be.a('array');
    });

    it("@Smoke - Get staff - Success case", async function () {
    const staffID = 'b339f710-6762-4c41-a0c2-2869eb8e1b11'
    const response = await staffService.getStaff(staffID, authConfig);
    const staff = (response.data) as Staff;
    response.status.should.equal(200, JSON.stringify(response.data));
    staff.id?.should.equal(staffID);
    });

    // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/7. The API should return 400 instead of 404 when the provided ID is negative.
    // eslint-disable-next-line ui-testing/no-disabled-tests
    it.skip("@Regression - Negative ID", async function () {
    const response = await staffService.getStaff(-1, authConfig);
    response.status.should.equal(400, JSON.stringify(response.data));
    });

    it("@Smoke - Create new staff - Success case", async function () {
        const newStaff: Staff = {
          name: "Vete",
          lastName: "Rinarian",
          age: 50,
          dateJoined: new Date(),
          role: "Veterinarian"
        };
        const response = await staffService.postStaff(newStaff, authConfig);
        response.status.should.equal(201, JSON.stringify(response.data));
        const createdStaff = response.data as Staff;
        createdStaff.should.have.property('id');
        //await staffService.deleteStaff(createdStaff.id, authConfig);
      });
    
      it("@Smoke - Delete staff - Success case", async function () {
        const newStaff: Staff = {
          name: "Test",
          lastName: "Delete",
          age: 28,
          dateJoined: new Date(),
          role: "Assistant"
        };
        const createResponse = await staffService.postStaff(newStaff, authConfig);
        const deleteResponse = await staffService.deleteStaff(createResponse.data.id, authConfig);
        deleteResponse.status.should.equal(204, JSON.stringify(deleteResponse.data));
      });
});