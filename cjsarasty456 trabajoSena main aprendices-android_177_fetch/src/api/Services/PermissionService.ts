import { API_END_POINT } from "../../constants/endpoints";
import { IPermission } from "../types/IPermission";
import { ApiClient } from "./ApiClient";

export const PermissionService = new ApiClient<IPermission>(API_END_POINT.permission);