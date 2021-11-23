import Button from "./Button";
import { useLocation } from 'react-router-dom';

const Header = ({ showAdd, clickShow }) => {
  const location = useLocation()

  return (
    <header className="header">
      <h1>Hello React world!</h1>
      {location.pathname == '/' &&
        <Button
        showAdd={showAdd}
        color={showAdd ? "green" : "red"}
        text={showAdd ? "Close" : "Add"}
        click={clickShow}
      />}
      
    </header>
  );
};

export default Header;
