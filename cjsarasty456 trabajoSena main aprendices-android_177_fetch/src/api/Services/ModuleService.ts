import { API_END_POINT } from "../../constants/endpoints";
import { IModule } from "../types/IModule";
import { ApiClient } from "./ApiClient";

export const ModuleService = new ApiClient<IModule>(API_END_POINT.module);