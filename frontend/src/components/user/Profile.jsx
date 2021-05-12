import React from "react";

function Profile({ user }) {
  const { id, password, name } = user || {};
  return (
    <>
      <h1>Profile</h1>
      <dt>Id</dt>
      <dd>{id}</dd>
      <dt>Password</dt>
      <dd>{password}</dd>
      <dt>Name</dt>
      <dd>{name}</dd>
    </>
  );
}

export default Profile;
