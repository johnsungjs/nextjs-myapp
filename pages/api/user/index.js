import nc from "next-connect";
import ErrorHandler from "@/src/handlers/error.handler";
import bcrypt from "bcryptjs";
import UserController from "@/src/controller/user.controller";
import { isNumber } from "lodash";

const handler = nc(ErrorHandler);

handler
  .post(async (req, res) => {
    let inputDTO = req.body;

    // check email
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(inputDTO?.password, salt);
    Reflect.set(inputDTO, "password", hashPassword);
    Reflect.set(inputDTO, "salt", salt);

    //create user baru
    const [err, data] = await new UserController({
      fields: inputDTO,
    }).create();

    if (err) {
      return res.status(400).json({
        message: err?.message ?? "Error: Some error",
      });
    }

    //activation email (skip dulu)

    Reflect.deleteProperty(data, "password");
    Reflect.deleteProperty(data, "salt");

    return res.status(200).json({
      message: "OK!",
      data: data,
    });
  })
  
  .delete(async (req, res) => {
    try {
      const inputDto = req.body;

      const [err, data] = await new UserController({
        key: inputDto?.key ?? "id",
        value: isNumber(inputDto?.value)
          ? Number(inputDto?.value)
          : inputDto?.value ?? null,
      }).delete();

      if (err) {
        return res.status(400).json({
          error: true,
          message: err?.message ?? "Bad request",
        });
      }
      return res.status(201).json({});
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: err?.message ?? "exceptions error",
      });
    }
  });

export default handler;
