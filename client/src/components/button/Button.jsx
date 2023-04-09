import "./button.css";

export default function Button({ value }) {
  return (
    <div>
      <button id="btn" type="submit">
        {value}
      </button>
    </div>
  );
}
