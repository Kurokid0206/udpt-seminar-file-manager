import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import Box from "@mui/material/Box";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { createDir, getSub, uploadFile } from "../../services/filesApi";
import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";

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
    name: "root",
  });
  const [addName, setAddName] = React.useState<string>("");
  const [listPrevRoot, setListPrevRoot] = React.useState<IRoot[]>([]);
  const [file, setFile] = React.useState<File>();
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
    formData.append("file", file);
    addFileMutation.mutate({
      parentID: nowParentRoot.id,
      formData: formData,
    });
    setIsOpen(false);
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

  // React.useEffect(() => {
  //   if(!getAllItemQuery.data){
  //     return
  //   }
  //   var newListFile: iFile[]=[]
  //   getAllItemQuery.data.forEach()
  //   getAllItemQuery.data
  //   var file: iFile
  //   file={

  //   }
  // }, [getAllItemQuery.data]);

  React.useEffect(() => {
    if (addFileMutation.isSuccess === true) {
      getAllItemQuery.refetch();
    }
  }, [addFileMutation.isLoading]);

  React.useEffect(() => {}, [nowParentRoot]);
  return (
    <div>
      <div className="flex justify-end">
        <Box sx={{ width: 500 }}>
          <BottomNavigation showLabels className="flex gap-2">
            <BottomNavigationAction
              onClick={() => {
                setIsOpen(true);
              }}
              label="Add folder"
              icon={<CreateNewFolderIcon />}
            />
            <BottomNavigationAction
              onClick={() => {
                setIsShowAddFileDialog(true);
              }}
              label="Add File"
              icon={<NoteAddIcon />}
            />
          </BottomNavigation>
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

      <Box>
        {listPrevRoot.map((root) => (
          <Button
            key={root.id}
            onClick={() => {
              setNowParentRoot(root);
              setListPrevRoot(listPrevRoot.slice(0, -1));
            }}
          >
            {root.name}
          </Button>
        ))}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>File id</TableCell>
              <TableCell>File name</TableCell>
              <TableCell>Last modified</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow
                key={`${file.object_id}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {file.is_file ? (
                  <TableCell>
                    <InsertDriveFileIcon />
                  </TableCell>
                ) : (
                  <TableCell>
                    <Button
                      onClick={() => {
                        setListPrevRoot([...listPrevRoot, nowParentRoot]);

                        setNowParentRoot({
                          id: file.object_id,
                          name: file.name,
                        });
                      }}
                    >
                      <FolderIcon />
                    </Button>
                  </TableCell>
                )}
                <TableCell>{file.object_id}</TableCell>
                <TableCell component="th" scope="row">
                  {file.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {file.updated_at}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      const url = `https://ti-pt-demo.s3.ap-southeast-1.amazonaws.com/${file.key}/${file.name}`;
                      console.log(url);
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
    </div>
  );
}
