import httpRequest from "../utils/httpRequest";

export const getSub = (parent_id: number) => {
  const url = `${parent_id}/get-sub`;

  return httpRequest.get<iFile[]>(url, {});
};

export const createDir = (parent_id: number, name: string) => {
  const url = `${parent_id}/create-dir`;

  return httpRequest.post(url, { name });
};

export const uploadFile = (parent_id: number, file: FormData) => {
  const url = `${parent_id}/upload-file`;

  return httpRequest.post(url, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
