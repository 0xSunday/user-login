import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useState } from "react";
function UserProfile() {
  const [isError, setIsError] = useState();
  async function changePasswordHandler(passwordData) {
    console.log(passwordData);
    const response = await fetch("/api/user/ChangePassword", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setIsError(data.message);
    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} isError={isError} />
    </section>
  );
}

export default UserProfile;
