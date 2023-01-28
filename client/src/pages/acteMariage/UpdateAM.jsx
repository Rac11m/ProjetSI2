import React from "react";

function UpdateAM({ user }) {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return (
    <>
      {user && (
        <>
          <div>updateAM</div>
        </>
      )}
    </>
  );
}

export default UpdateAM;
