import "dotenv/config";
import { StoreService } from "../base/StoreService.js";
import { DeleteOrderResponse } from "../models/responses/DeleteOrderResponse.js";
import { Order } from "../models/Order.js";
import { should } from 'chai';
should();

const storeService = new StoreService();

describe("Delete Order", function () {
  
    let orderID = 5;

    beforeEach(async function () {
        const beforeOrder: Order = {
            id: orderID,
            petId: 1,
            quantity: 1,
            shipDate: new Date(),
            status: "placed",
            complete: true,
          };
        await storeService.postOrder(beforeOrder);
      });

    it("@Smoke - Success case", async function () {
      const response = await storeService.deleteOrder(orderID);
      const data = response.data as DeleteOrderResponse;
      response.status.should.equal(200, JSON.stringify(data));
      data.message?.should.equal(orderID.toString());
    });

    it("@Smoke - Unexisting order", async function () {
      await storeService.deleteOrder(orderID);
      const response = await storeService.deleteOrder(orderID);
      response.status.should.equal(404, JSON.stringify(response.data));
    });

    // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/7. The API should return 400 instead of 404 when the provided ID is negative.
    // eslint-disable-next-line ui-testing/no-disabled-tests
    it.skip("@Regression - Negative ID", async function () {
      const response = await storeService.deleteOrder(-1);
      response.status.should.equal(400, JSON.stringify(response.data));
    });

    // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/7. The API should return 400 instead of 404 when the id is out of range. 
    // eslint-disable-next-line ui-testing/no-disabled-tests
    it.skip("@Regression - ID out of range", async function (){
      let id = 9223372016900018001n;
      const response = await storeService.deleteOrder(id.toString());
      response.status.should.equal(400, JSON.stringify(response.data));
    });

    // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/7. The API should return 400 instead of 404 when the ID has an invalid type.
    // eslint-disable-next-line ui-testing/no-disabled-tests
    it.skip("@Regression - Invalid id type", async function () {
      const id = false;
      const response = await storeService.deleteOrder(id);
      response.status.should.equal(400, JSON.stringify(response.data));
    });
  });