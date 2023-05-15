import React, { useEffect } from "react";
import { createDir, getSub, uploadFile } from "../../services/filesApi";
import { useMutation, useQuery } from "react-query";

const TestApi: React.FC = () => {
  const parent_id = 1;
  const [file, setFile] = React.useState<File>();

  const uploadFIle = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      fileUploadMutation.mutate({ dir_parent_id: parent_id, file: formData });
    }
  };

  const filesQuery = useQuery(
    ["get_files", parent_id],
    () => getSub(parent_id),
    {
      retry: 2,
    }
  );

  const fileMutation = useMutation(
    (data: { dir_parent_id: number; dir_name: string }) =>
      createDir(data.dir_parent_id, data.dir_name),
    {
      onSuccess: () => {
        filesQuery.refetch();
      },
    }
  );

  const fileUploadMutation = useMutation(
    (data: { dir_parent_id: number; file: FormData }) =>
      uploadFile(data.dir_parent_id, data.file),
    {
      onSuccess: () => {
        filesQuery.refetch();
      },
    }
  );

  if (filesQuery.isLoading) return <div>loading...</div>;
  if (filesQuery.isError) return <div>error</div>;
  console.log(filesQuery.data);

  return (
    <>
      <div className="layout-container w-full ">test Api page</div>
      <input
        type="file"
        name="file"
        id=""
        onChange={(e) => setFile(e.target.files![0])}
      />
      <button onClick={() => uploadFIle()}>upload</button>
    </>
  );
};
export default TestApi;
