import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon  from "@material-ui/icons/Delete"
import Typography from '@material-ui/core/Typography';
import ExpandNote from "../ExpandNote/ExpandNote"
import Edit from '../Edit/Edit';





const useStyles = makeStyles((theme) =>({
  root: {
    width: 275,
    minHeight : 150,
    margin : 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
    marginBottom : '10px',
    wordBreak: 'break-all'
  },
  pos: {
    marginBottom: 12,
  },

}));




export default function NoteCard({title, content, deleteNote, id, edit}) {
  const classes = useStyles();
    const handleDelete = () => {
      deleteNote(id)
    }

  return (
    <>
    <Card className={classes.root}>
      <CardContent>
        <Typography variant = "h6" className = {classes.title}>
          {title}
        </Typography>
        <Typography paragraph>
          {content.substring(0, 100)}.....
        </Typography>
      </CardContent>
      <CardActions>
        <Edit id = {id} title = {title} content = {content} edit = {edit}/>
        <Button size="small" onClick = {handleDelete}>
          <DeleteIcon/>
        </Button>
        <ExpandNote title= {title} content={content}/>
        
      </CardActions>
    </Card>
     
    </>
  );
}
