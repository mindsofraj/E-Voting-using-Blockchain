import "./profileComp.css";

export default function ProfileComp() {
  return (
    <div className="profileCompContainer">
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
              <td>Phone No:</td>
              <td>8124592262</td>
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
