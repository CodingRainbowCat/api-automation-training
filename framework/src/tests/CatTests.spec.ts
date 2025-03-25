import "dotenv/config";
import { CatService } from "../base/CatService.js";
import { Cat } from "../models/Cat.js";
import { should } from 'chai';
should();

const catService = new CatService();

describe("Cat Tests", function () {

    const catId = 1;
    
    it("@Smoke - Get all - Success case", async function () {
        const response = await catService.getAllCats();
        const cats = response.data as Cat[];
        response.status.should.equal(200, JSON.stringify(response.data));
        cats.should.be.an('array');
    });

    it("@Smoke - Get cat - Success case", async function () {
      const response = await catService.getCat(catId);
      const cat = (response.data) as Cat;
      response.status.should.equal(200, JSON.stringify(response.data));
      cat.id?.should.equal(catId);
    });

    it("@Smoke - Create new cat - Success case", async function () {
      const newCat: Cat = {
        name: "Mittens",
        age: 1,
        breed: "Persian",
        dateJoined: new Date(),
        vaccinated: true,
        temperament: ["Calm", "Affectionate"],
        staffInCharge: "00000000-0000-0000-0000-000000000000",
        isAdopted: false
      };
      const response = await catService.postCat(newCat);
      response.status.should.equal(201,  JSON.stringify(response.data));
      const createdCat = response.data as Cat;
      createdCat.should.have.property('id');
    });
  
    //Put
    it("@Smoke - Update cat - Success case", async function () {
      const updateData: Cat = {
        name: "White Whiskers",
        age: 4,
        breed: "Ragdoll",
        dateJoined: new Date(),
        vaccinated: true,
        temperament: ["Calm", "Curious", "Dominant"],
        staffInCharge: "00000000-0000-0000-0000-000000000000",
        isAdopted: false
      };
      const response = await catService.updateCat(catId, updateData);
      response.status.should.equal(200);
      const updatedCat = response.data as Cat;
      updatedCat.name!.should.equal(updateData.name);
      updatedCat.age!.should.equal(updateData.age);
    });
  
    //Patch
    it("@Smoke - Update cat's staff or adopt - Success case", async function () {
      const updateData: Partial<Cat> = {
        staffInCharge: "b339f710-6762-4c41-a0c2-2869eb8e1b11",
        adopterId: 1
      };
      const response = await catService.updateCatStaffOrAdopt(catId, updateData);
      response.status.should.equal(200);
      const updatedCat = response.data as Cat;
      updatedCat.staffInCharge!.should.equal(updateData.staffInCharge);
      updatedCat.isAdopted!.should.equal(true);
      updatedCat.adopterId!.should.equal(updateData.adopterId);
    });
  
    it("@Smoke - Delete Cat - Success case", async function () {
      const newCat: Cat = {
        name: "TestDelete",
        age: 1,
        breed: "Mixed",
        dateJoined: new Date(),
        vaccinated: true,
        temperament: ["Independent"],
        staffInCharge: "00000000-0000-0000-0000-000000000000",
        isAdopted: false
      };
      const createResponse = await catService.postCat(newCat);
      const deleteResponse = await catService.deleteCat(createResponse.data.id);
      deleteResponse.status.should.equal(204, JSON.stringify(deleteResponse.data));
    });
});