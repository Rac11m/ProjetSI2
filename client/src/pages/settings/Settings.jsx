import React from "react";

function Settings({ user }) {
  return (
    <>
      {user && (
        <>
          <div>Settings</div>
        </>
      )}
    </>
  );
}

export default Settings;
