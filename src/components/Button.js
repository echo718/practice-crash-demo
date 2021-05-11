const Button = ({ showAdd,color,text,click }) => {
   
  return (
    <button
      className="btn"
      style={{ backgroundColor: color }}    
      onClick={click} 
    >
      {text}
    </button>
  );
};

export default Button;
