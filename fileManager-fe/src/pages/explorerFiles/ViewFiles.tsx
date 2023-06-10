import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { createDir, getSub, uploadFile } from "../../services/filesApi";
import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  IconButton,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import dayjs from "dayjs";

interface IRoot {
  id: number;
  name: string;
}
export default function ViewFile() {
  const [files, setFiles] = React.useState<IFile[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isShowAddFileDialog, setIsShowAddFileDialog] =
    React.useState<boolean>(false);
  const [nowParentRoot, setNowParentRoot] = React.useState<IRoot>({
    id: 1,
    name: "root bucket",
  });
  const [addName, setAddName] = React.useState<string>("");
  const [file, setFile] = React.useState<File>();
  const [listPrevRoot, setListPrevRoot] = React.useState<IRoot[]>([]);

  //==================================================================================
  //event handler
  const handleCloseAddFolder = () => {
    setIsOpen(false);
  };

  const handleCloseAddFile = () => {
    setIsShowAddFileDialog(false);
  };

  const handleAddFolder = () => {
    addFolderMutation.mutate({
      parentID: nowParentRoot.id,
      folderName: addName,
    });
    setIsOpen(false);
  };

  const handleAddFile = () => {
    const formData = new FormData();
    if (!file) return;
    formData.append("file", file);
    addFileMutation.mutate({
      parentID: nowParentRoot.id,
      formData: formData,
    });
    setIsShowAddFileDialog(false);
  };

  const clickPreBreadcrumb = (id: number) => {
    var listNewPrevRoot: IRoot[] = [];
    for (let index = 0; index < listPrevRoot.length; index++) {
      const element = listPrevRoot[index];
      if (element.id !== id) {
        listNewPrevRoot.push(element);
      } else {
        setNowParentRoot(element);
        break;
      }
    }
    setListPrevRoot(listNewPrevRoot);
  };
  const handleBackNavigation = () => {
    var listNewPrevRoot: IRoot[] = [];
    for (let index = 0; index < listPrevRoot.length; index++) {
      const element = listPrevRoot[index];
      listNewPrevRoot.push(element);
    }
    if (listNewPrevRoot.length === 0) return;
    var nowParent: IRoot | undefined = listNewPrevRoot.pop();
    setListPrevRoot(listNewPrevRoot);
    if (nowParent) {
      setNowParentRoot(nowParent);
    }
  };

  const handleDownloadFile = async (url: string, name: string) => {
    // console.log(url.replace("//", "/"));
    const response = await fetch(
      // "https://ti-pt-demo.s3.ap-southeast-1.amazonaws.com///AishiaNight.png"
      url
    );

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = name;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  //==================================================================================
  //query and mutation
  const addFolderMutation = useMutation(
    (data: { parentID: number; folderName: string }) => {
      return createDir(data.parentID, data.folderName);
    }
  );

  const addFileMutation = useMutation(
    (data: { parentID: number; formData: FormData }) => {
      return uploadFile(data.parentID, data.formData);
    }
  );

  const getAllItemQuery = useQuery(
    ["getAllItemQuery", nowParentRoot],
    () =>
      getSub(nowParentRoot.id).then((result) => {
        setFiles(result.data as IFile[]);
      }),
    {
      retry: 2,
      refetchOnWindowFocus: false,
      refetchInterval: 0,
    }
  );

  //=======================================================================
  // side effect
  React.useEffect(() => {
    if (addFileMutation.isSuccess === true) {
      getAllItemQuery.refetch();
    }
    if (addFolderMutation.isSuccess === true) {
      getAllItemQuery.refetch();
    }
  }, [addFileMutation.isLoading, addFolderMutation.isLoading]);

  return (
    <div>
      <div className="flex justify-end">
        <Box sx={{ width: 500 }}>
          <div className="flex gap-2 justify-end">
            <Fab
              color="secondary"
              aria-label="Add folder"
              variant="extended"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <CreateNewFolderIcon sx={{ mr: 1 }} />
              Add folder
            </Fab>
            <Fab
              color="secondary"
              aria-label="Add file"
              variant="extended"
              onClick={() => {
                setIsShowAddFileDialog(true);
              }}
            >
              <NoteAddIcon sx={{ mr: 1 }} />
              Add file
            </Fab>
          </div>
        </Box>
      </div>

      <Dialog open={isOpen} onClose={handleCloseAddFolder}>
        <DialogTitle>Add new Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new folder
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder name"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setAddName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddFolder}>Cancel</Button>
          <Button onClick={handleAddFolder}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isShowAddFileDialog} onClose={handleCloseAddFile}>
        <DialogTitle>Add new File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new folder
          </DialogContentText>
          <input
            type="file"
            name="file"
            id=""
            onChange={(e) => setFile(e.target.files![0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddFile}>Cancel</Button>
          <Button onClick={handleAddFile}>Add</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex", flexDirection: "row", gap: "48px" }}>
        <Button
          onClick={handleBackNavigation}
          disabled={listPrevRoot.length === 0}
          color="primary"
          variant="outlined"
        >
          <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
        </Button>
        <Breadcrumbs aria-label="breadcrumb">
          {listPrevRoot?.map((root) => (
            <Button
              key={root.id}
              onClick={() => {
                clickPreBreadcrumb(root.id);
              }}
              color="secondary"
            >
              {root.name}
            </Button>
          ))}

          <Button key={nowParentRoot.id} color="secondary">
            {nowParentRoot.name}
          </Button>
        </Breadcrumbs>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Object id</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell>Object name</TableCell>
              <TableCell>Last modified</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files?.map((file) => (
              <TableRow
                key={`${file.object_id}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: file.is_file ? "default" : "pointer",
                  "&:hover": { background: "#c8d6ec" },
                }}
                onClick={() => {
                  if (!file.is_file) {
                    let newList: IRoot[] = listPrevRoot.map((item) => item);
                    newList.push(nowParentRoot);
                    setListPrevRoot(newList);

                    setNowParentRoot({
                      id: file.object_id,
                      name: file.name,
                    });
                  }
                }}
              >
                <TableCell>{file.object_id}</TableCell>
                {file.is_file ? (
                  <TableCell align="right">
                    <Button
                      disableRipple
                      disableFocusRipple
                      disableElevation
                      sx={{ pointerEvents: "none" }}
                      color="secondary"
                    >
                      <InsertDriveFileIcon />
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell align="right">
                    <Button
                      disableRipple
                      disableFocusRipple
                      disableElevation
                      sx={{ pointerEvents: "none" }}
                    >
                      <FolderIcon />
                    </Button>
                  </TableCell>
                )}
                <TableCell component="th" scope="row">
                  {file.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dayjs(file.updated_at).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      const objectPath = `${file.key}/${file.name}`;
                      // console.log(
                      //   `${
                      //     objectPath[0] == "/"
                      //       ? objectPath.slice(1)
                      //       : objectPath
                      //   }`
                      // );

                      const url = `https://ti-pt-demo.s3.ap-southeast-1.amazonaws.com/${
                        objectPath[0] == "/" ? objectPath.slice(1) : objectPath
                      }`;
                      // console.log(url);
                      handleDownloadFile(url, file.name);
                    }}
                  >
                    {file.is_file ? <FileDownloadIcon /> : null}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {files.length === 0 && (
        <div className="w-full p-14 text-center">Empty folder</div>
      )}
    </div>
  );
}
