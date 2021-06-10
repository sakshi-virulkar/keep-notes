import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EditIcon  from "@material-ui/icons/Edit"
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '50ch',
        }}  ,
    paper: {
        position: 'absolute',
        width: 400,
        minHeight : 200,
        display : 'flex',
        flexDirection : 'column',
        justifyContent : "sapce-around",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function Edit({title, content, id , edit}) {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const [data, setData] = useState({})
    const [t, setT] = useState(title)
    const [c, setC] = useState(content)



    useEffect(() => {
        edit(data)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const titleEdit = (e) => {
        setT(e.target.value)
    }
    const contentEdit = (e) => {
        setC(e.target.value)

    }

    const onEditSave = (e) => {
        e.preventDefault();
        const newData = {...data, id : id , title : t, content : c}
        setData(newData)
        handleClose()
    }
    
    const body = (
        <div style={modalStyle} className={classes.paper}>               
            <TextField id="standard-basic" style = {{margin : '30px'}} label="Standard" name="title" value = {t} onChange = {titleEdit} />
            <TextField
            style = {{margin : '30px'}}
            id="standard-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            value = {c} onChange = {contentEdit}
            />
            <Button variant = 'contained' color = "primary" onClick = {onEditSave} style = {{margin : '30px'}}>SAVE</Button>
        </div>
      );

    return (
        <div>
        <div>
      <Button type="button" onClick={handleOpen}>
        <EditIcon/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
            
        </div>
    )
}

export default Edit
