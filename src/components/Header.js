import Button from "./Button";

const Header = ({ showAdd, clickShow }) => {
  return (
    <header className="header">
      <h1>Hello React world!</h1>
      <Button
        showAdd={showAdd}
        color={showAdd ? "green" : "red"}
        text={showAdd ? "Close" : "Add"}
        click={clickShow}
      />
    </header>
  );
};

export default Header;
