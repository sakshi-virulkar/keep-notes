import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop : "20px",

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  notebox: {
    display : "flex",
    flexDirection: "column",
    justifyContent : "center",
    alignItems : "center",  
    width : "100vw"
  },
  textField :{
      width : "40vw"
  } 
  
}));

export default function AddNote({id,title, content, titleChange, contentChange,onEditSave, saveNote, toUpdate}) {
  const classes = useStyles();

  const editTrigger = () => {
    onEditSave(id, title,content);
  }


  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className = {classes.notebox}>
      <TextField
          className ={classes.textField}
          id="standard-textarea"
          label="Title"
          placeholder="Title"
          value = {title}
          onChange = {titleChange}
          multiline
        />
        <TextField
        className ={classes.textField}
          id="standard-textare"
          placeholder="Write content here"
          value= {content}
          onChange = {contentChange}
          multiline
        />
        <Button variant="contained" color="primary" onClick = {(toUpdate ? editTrigger : saveNote)}>
        SAVE
        </Button>
      </div>
    </form>
  );
}
