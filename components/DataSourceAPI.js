import { BuildApiUrl } from "./hooks/APIsFunctions/BuildApiUrl";

export const DataSourceAPI = (query, skip, take) =>
  BuildApiUrl(query, {
    pageIndex: skip / take + 1,
    pageSize: take,
  });