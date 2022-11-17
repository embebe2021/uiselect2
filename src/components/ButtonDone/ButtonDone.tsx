import { classes } from "./ButtonDone.st.css";

type ButtonDoneProps = {
  toggleDropdown: () => void;
};

const ButtonDone = ({ toggleDropdown }: ButtonDoneProps) => {
  return (
    <div className={classes.root}>
      <button
        className={classes.btn}
        data-hook="btnDone"
        onClick={() => toggleDropdown()}
      >
        Done
      </button>
    </div>
  );
};

export default ButtonDone;
