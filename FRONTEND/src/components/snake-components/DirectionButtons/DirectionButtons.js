import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "./DirectionButtons.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#264653",
    },
  },
});

const DirectionButtons = ({ direction, setRunning, setDirection }) => {
  useEffect(() => {
    const checkKey = (e) => {
      e = e || window.event;

      if (e.keyCode === 38) {
        handelUp();
      } else if (e.keyCode === 40) {
        handelDown();
      } else if (e.keyCode === 37) {
        handelLeft();
      } else if (e.keyCode === 39) {
        handelRight();
      }
    };
    document.onkeydown = checkKey;
  });

  const handelRight = () => {
    if (direction !== "left") {
      setRunning(true);
      setDirection("right");
    }
  };

  const handelLeft = () => {
    if (direction !== "right") {
      setRunning(true);
      setDirection("left");
    }
  };

  const handelUp = () => {
    if (direction !== "down") {
      setRunning(true);
      setDirection("up");
    }
  };

  const handelDown = () => {
    if (direction !== "up") {
      setRunning(true);
      setDirection("down");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='buttons'>
        <div className='buttons-directions'>
          <div></div>
          <Button
            onClick={handelUp}
            disableElevation
            variant='outlined'
            size='large'
            color='primary'
          >
            up
          </Button>
          <div></div>
          <Button
            onClick={handelLeft}
            disableElevation
            variant='outlined'
            size='large'
            color='primary'
          >
            left
          </Button>
          <div></div>
          <Button
            onClick={handelRight}
            disableElevation
            variant='outlined'
            size='large'
            color='primary'
          >
            right
          </Button>
          <div></div>
          <Button
            onClick={handelDown}
            disableElevation
            variant='outlined'
            size='large'
            color='primary'
          >
            down
          </Button>
          <div></div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DirectionButtons;
