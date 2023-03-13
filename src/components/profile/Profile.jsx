import "./profile.css";

export default function Profile() {
  return (
    <div className="profileContainer">
      <img
        className="profileImg"
        src="https://www.behindwoods.com/tamil-movies/slideshow/the-ultimate-dream-girl/images/nazariya-nazim---eyes.jpg"
        alt="Profile Image"
      />
      <div className="profileDetails">
        <table className="detailTable">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>Nazariya</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>nazi@gmail.com</td>
            </tr>
            <tr>
              <td>Aadhaar No:</td>
              <td>4816 3433 6673</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
