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
import { getSub } from "../../services/filesApi";
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

interface iFile {
  object_id: string;
  name: string;
  key: string;
  is_file: boolean;
  parent_root: number;
}
export default function ViewFile() {
  const [files, setFiles] = React.useState<iFile[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    getSub(1).then((res) => {
      setFiles(res);
    });
  }, []);

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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Is File</TableCell>
              <TableCell>Object ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Download</TableCell>
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
