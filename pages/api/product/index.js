import ErrorHandler from "@/src/handlers/error.handler";
import { linkApi } from "@/src/service/linkApi";
import { ProductValidator } from "@/src/validator";
import nc from "next-connect";

const handler = nc(ErrorHandler);

handler
  .post(
    ProductValidator.create,
    async(req, res) => {
      return res.status(200).json(req.body);
    }
  )
  .get(async (req, res) => {
    const [err, data] = await fetch(linkApi)
      .then((res) => res.json())
      .then((result) => {
        return [null, result];
      })
      .catch((err) => {
        return [err, null];
      });
    if (err) {
      return res.status(400).json({
        error: true,
        message: "Ada error neh",
      });
    }
    return res.status(200).json(data);
  });

export default handler;

//ini cth buat data dummy
// .get(async (req, res) => {
//   return res.status(200).json([
//     { productId: 1, name: "White Shoes" },
//     { productId: 2, name: "And the Couples" },
//   ]);
// });
