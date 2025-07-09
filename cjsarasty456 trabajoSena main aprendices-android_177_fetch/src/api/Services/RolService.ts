
import { API_END_POINT } from "../../constants/endpoints";
import { IRol } from "../types/IRol";
import { ApiClient } from "./ApiClient";

export const RolService = new ApiClient<IRol>(API_END_POINT.rol)