import "./profile.css";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/Topbar";
import ProfileComp from "../../components/profile/ProfileComp";

export const ProfileComponent = () => {
  return (
    <div className="profile">
      <div className="profileWrapper">
        <h1 className="title">User Profile</h1>
        <ProfileComp />
      </div>
    </div>
  )
}


export default function Profile() {
  return (
    <div>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <ProfileComponent />
      </div>
    </div>
  );
}
