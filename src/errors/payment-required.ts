import { ApplicationError } from "@/protocols";

export function paymentRequired(): ApplicationError {
  return {
    name: "PaymenteRequired",
    message: "Paymente required!",
  };
}
