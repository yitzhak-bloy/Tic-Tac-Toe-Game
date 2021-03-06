import { createPortal } from "react-dom";
import { useContext } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import { PlayerContext } from "../../../shared/context/Player-context";
import "./PopsUp.css";

const useStyles = makeStyles(() => ({
  dialogContent: {
    margin: "auto",
    width: "fit-content",
  },
}));

const PopsUpOverlay = ({
  open,
  handleClose,
  title,
  contentText,
  contentButton,
}) => {
  const { dialogContent } = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <div className='dialog'>
        <DialogTitle id='alert-dialog-title' className={dialogContent}>
          {title}
        </DialogTitle>
        <DialogContent className={dialogContent}>
          <DialogContentText
            className='dialog--text'
            id='alert-dialog-description'
          >
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='outlined'
            size='small'
            color='primary'
            autoFocus
            className={dialogContent}
            className='dialog--text dialog__button'
          >
            {contentButton}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

const PopsUp = ({ open, handleClose, description }) => {
  const huPlayer = useContext(PlayerContext).huPlayer;

  const title =
    description[0] === "snake"
      ? "game over!"
      : description.message
      ? "error"
      : description[1] == "tie"
      ? "tie"
      : description[1] == huPlayer || description[0] == "MatchingCard"
      ? "You won!"
      : "You lost!";

  const contentText =
    description[0] === "snake"
      ? `The game is over, your achievement is ${description[1]}.`
      : description.message
      ? description.message
      : description[1] == "tie"
      ? "There is no winner"
      : description[1] == huPlayer
      ? "Congratulations! you are the winner!"
      : description[0] == "MatchingCard"
      ? `The number of steps you have taken to win the game is: ${description[1]}`
      : "Losing isn't the end. You can always win the next time.";

  const contentButton = description.message ? "Close" : "New game";

  return (
    <>
      {createPortal(
        <PopsUpOverlay
          open={open}
          handleClose={handleClose}
          title={title}
          contentText={contentText}
          contentButton={contentButton}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default PopsUp;
