import React from "react";

function UpdateAN({ user }) {
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
          <div>updateAN</div>
        </>
      )}
    </>
  );
}

export default UpdateAN;
