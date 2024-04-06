import type e from "express";
import type {
  IResponse,
  IResponseMapperParams,
} from "../shared/interface.shared";

export class Response {
  public static map({
    res,
    data = null,
    message = "Success",
    status = 200,
  }: IResponseMapperParams): e.Response<IResponse> {
    return res.status(status).json({
      success: status >= 200 && status < 300,
      status,
      message,
      data,
    });
  }
}
