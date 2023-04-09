import "./input.css";

export default function Input({ placeholder }) {
  return (
    <div className="input">
      <input type="text" id="inputBox" placeholder={placeholder} />
    </div>
  );
}
