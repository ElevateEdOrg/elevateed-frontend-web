import { useSelector } from "react-redux";

export const Homepage = () => {
  const state = useSelector((state) => state);
  const foo = () => {
    console.log(state);
  };
  return (
    <div>
      Homepage
      <button onClick={foo}>Click me</button>
    </div>
  );
};
