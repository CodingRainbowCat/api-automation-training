import "dotenv/config";
import { AdopterService } from "../base/AdopterService.js";
import { Adopter } from "../models/Adopter.js";
import { should } from 'chai';
should();

const adopterService = new AdopterService();

describe("Adopter Tests", function () {
  const adopterId = 1;

  it("@Smoke - Get all adopters - Success case", async function () {
    const response = await adopterService.getAllAdopters();
    const adopters = response.data as Adopter[];
    response.status.should.equal(200, JSON.stringify(response.data));
    adopters.should.be.an('array');
  });

  it("@Smoke - Get adopter by ID - Success case", async function () {
    const response = await adopterService.getAdopter(adopterId);
    const adopter = response.data as Adopter;
    response.status.should.equal(200, JSON.stringify(response.data));
    adopter.id!.should.equal(adopterId);
  });

  it("@Smoke - Create new adopter - Success case", async function () {
    const newAdopter: Adopter = {
      name: "One",
      lastName: "adopter",
      dateOfBirth: new Date("1995-05-05"),
      phone: "9876543210",
      address: "456 Test Ave"
    };
    const response = await adopterService.postAdopter(newAdopter);
    response.status.should.equal(201, JSON.stringify(response.data));
    const createdAdopter = response.data as Adopter;
    createdAdopter.should.have.property('id');
    console.log(createdAdopter);
    await adopterService.deleteAdopter(createdAdopter.id);
  });

  it("@Smoke - Delete adopter - Success case", async function () {
    const newAdopter: Adopter = {
      name: "Test",
      lastName: "Delete",
      dateOfBirth: new Date("2000-12-12"),
      phone: "5555555555",
      address: "789 Test Blvd"
    };
    const createResponse = await adopterService.postAdopter(newAdopter);
    const deleteResponse = await adopterService.deleteAdopter(createResponse.data.id);
    deleteResponse.status.should.equal(204, JSON.stringify(deleteResponse.data));
  });
});