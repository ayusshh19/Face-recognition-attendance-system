import axios from "axios";
import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import "../style/nav.css";
import { mark } from "../apiroutes/apiroutes";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Nav() {
  const [open, setOpen] = React.useState(false);
  const [subject,setsubject]=React.useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const markattendance = async () => {
    const markattend = await axios.post(mark,{
      'subject':subject,
    });
    if(markattend.status===200){
      toast.success(markattend.data.msg)
      handleClose()
    }
  };
  return (
    <>
      <header>
        <h1>DMCE</h1>
        <nav>
          <Link to={'/'}>HOME</Link>
          <Link to={'#about'}>ABOUT</Link>
          <Link to={'#records'}>RECORDS</Link>
          <Link to={'/visual'}>VISUALS</Link>
        </nav>
        <button className="dash" onClick={handleOpen}>
          Attandance
        </button>
      </header>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add your subject :
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LocalLibraryIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Subject"
                variant="standard"
                onChange={(e)=>setsubject(e.target.value)}
              />
              <Button variant="contained" onClick={markattendance}>Proceed</Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Nav;
