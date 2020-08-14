import React from "react";
import { auth } from "./firebase";
import "./Header.css";
import { Avatar, Button } from "@material-ui/core";

function Header({ loggedUser }) {
  return (
    <nav className="header">
      <img
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="Instagram"
        className="header__image"
      />

      <div className="header__right">
        <Button
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </Button>
        <Avatar src="/static/image/avatar/1.jpg" title={loggedUser} />
      </div>
    </nav>
  );
}

export default Header;
