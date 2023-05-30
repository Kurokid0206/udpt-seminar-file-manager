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
import { createDir, getSub } from "../../services/filesApi";
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
import { useMutation, useQueries, useQuery } from "react-query";

const data: iFile[] = [
  {
    object_id: 2,
    dayCreate: "2023/12/01 12:08:01",
    dayModifed: "2023/12/01 12:08:05",
    is_file: false,
    key: "son-tm/",
    name: "profile",
    parent_root: 1,
  },
  {
    object_id: 3,
    dayCreate: "2023/12/02 12:08:01",
    dayModifed: "2023/12/02 12:08:05",
    is_file: true,
    key: "son-tm/",
    name: "som-tm.txt",
    parent_root: 1,
  },
];

export default function ViewFile() {
  const [files, setFiles] = React.useState<iFile[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [nowParentRoot, setNowParentRoot] = React.useState<number>(1);
  const [addName, setAddName] = React.useState<string>("");

  //==================================================================================
  //envent handler
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAddFile = () => {
    addFileMutation.mutate({ parentID: nowParentRoot, fileName: addName });
    setIsOpen(false);
  };

  //==================================================================================
  //query and mutation
  const addFileMutation = useMutation(
    (data: { parentID: number; fileName: string }) => {
      return createDir(data.parentID, data.fileName);
    }
  );
  const getAllItemQuery = useQuery(
    ["getAllItemQuery", nowParentRoot],
    () => getSub(nowParentRoot),
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

  return (
    <div>
      <div className="flex justify-end">
        <Box sx={{ width: 500 }}>
          <BottomNavigation showLabels className="flex gap-2">
            <BottomNavigationAction
              onClick={() => {
                // console.log("add");
                setIsOpen(true);
              }}
              label="Add folder"
              icon={<CreateNewFolderIcon />}
            />
            <BottomNavigationAction label="Add File" icon={<NoteAddIcon />} />
          </BottomNavigation>
        </Box>
      </div>

      <Dialog open={isOpen} onClose={handleClose}>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddFile}>Add</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>File name</TableCell>
              <TableCell>Last modified</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow
                key={file.object_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {file.is_file ? (
                  <TableCell>
                    <InsertDriveFileIcon />
                  </TableCell>
                ) : (
                  <TableCell>
                    <FolderIcon />
                  </TableCell>
                )}
                <TableCell>{file.object_id}</TableCell>
                <TableCell component="th" scope="row">
                  {file.name}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      console.log(file.key);
                    }}
                  >
                    <FileDownloadIcon />
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
