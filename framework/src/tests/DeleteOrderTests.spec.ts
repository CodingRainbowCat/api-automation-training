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
      response.status.should.equal(200, JSON.stringify(response.data));
      data.message?.should.equal(orderID.toString());
    });

    it("@Smoke - Unexisting order", async function () {
      await storeService.deleteOrder(orderID);
      const response = await storeService.deleteOrder(orderID);
      response.status.should.equal(404, JSON.stringify(response.data));
    });
  });