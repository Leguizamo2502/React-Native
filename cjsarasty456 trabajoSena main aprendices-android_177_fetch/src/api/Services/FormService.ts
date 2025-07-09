
import { API_END_POINT } from "../../constants/endpoints";
import { IForm } from "../types/IForm";
import { ApiClient } from "./ApiClient";

export const FormService = new ApiClient<IForm>(API_END_POINT.form)