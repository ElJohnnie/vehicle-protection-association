import gateways from "@/gateways";
import {
  sanitizeValues,
  compareByPaymentMethod,
  toFloat,
} from "../../helpers/utils";

const plans = {
  async getPlans(headers) {
    let payment;
    try {
      const { data } = await gateways.getPlans(headers);
      data.plans.forEach((element) => {
        payment = element.planPrices.sort((a, b) => {
          if (a.payment === "creditcard") {
            return -1;
          } else if (b.payment === "creditcard") {
            return 1;
          } else {
            return 0;
          }
        });
        element.planPrices = payment;
      });
      return { status: "success", data };
    } catch (err) {
      return err;
    }
  },
  async getPlanById(headers, id) {
    let creditCard;
    let boleto;
    try {
      const { data } = await gateways.getPlanById(headers, id);
      data.plan.planPrices.sort(compareByPaymentMethod);
      creditCard = toFloat(data.plan.planPrices[0].value);
      boleto = toFloat(data.plan.planPrices[1].value);
      data.plan.planPrices[0].value = creditCard;
      data.plan.planPrices[1].value = boleto;
      return { status: "success", data };
    } catch (err) {
      return err;
    }
  },
  async setPlan(headers, data) {
    try {
      data.planPrices = data.planPrices.map((item) => {
        const values = sanitizeValues(item.value);
        return {
          payment: item.payment,
          value: values,
        };
      });
      data.quantity = parseInt(data.quantity);
      await gateways.setPlan(headers, data);
      return { status: "success" };
    } catch (err) {
      return {
        status: "generic_error",
        message: err.response.data.message,
      };
    }
  },

  // consertar aqui no edit
  async editPlan(headers, id, data) {
    try {
      data.planPrices = data.planPrices.map((item) => {
        const values = sanitizeValues(item.value);
        return {
          payment: item.payment,
          value: values,
        };
      });
      data.quantity = parseInt(data.quantity);
      await gateways.editPlan(headers, id, data);
      return { status: "success" };
    } catch (err) {
      return {
        status: "generic_error",
        message: err.response.data.message,
      };
    }
  },
  deletePlan(headers, id) {
    return gateways
      .deletePlan(headers, id)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
};

export default plans;
