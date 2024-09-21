import { SigninForm } from "../common/Schema";
import instance from "./api";
// import instance from "./instance";

export const signin = (data: SigninForm) => {
    const uri = "api/auth/signin"
    return instance.post(uri, data)
}