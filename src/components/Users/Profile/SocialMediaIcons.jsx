import React from "react";
import { IconContext } from "react-icons";
import { SlSocialVkontakte } from "react-icons/sl";
import {
  BsFacebook,
  BsLink45Deg,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsGithub,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

const SocialMediaIcons = ({ contacts }) => {
  return (
    <IconContext.Provider value={{ color: "black", size: "1.4em" }}>
      <div className={styles.contacts}>
        <Link
          to={contacts.facebook}
          target="_blank"
          className={contacts.facebook ? "" : styles.empty}
        >
          <BsFacebook />
        </Link>
        <Link
          to={contacts.website}
          target="_blank"
          className={contacts.website ? "" : styles.empty}
        >
          <BsLink45Deg />
        </Link>
        <Link
          to={contacts.vk}
          target="_blank"
          className={contacts.vk ? "" : styles.empty}
        >
          <SlSocialVkontakte />
        </Link>
        <Link
          to={contacts.twitter}
          target="_blank"
          className={contacts.twitter ? "" : styles.empty}
        >
          <BsTwitter />
        </Link>
        <Link
          to={contacts.instagram}
          target="_blank"
          className={contacts.instagram ? "" : styles.empty}
        >
          <BsInstagram />
        </Link>
        <Link
          to={contacts.youtube}
          target="_blank"
          className={contacts.youtube ? "" : styles.empty}
        >
          <BsYoutube />
        </Link>
        <Link
          to={contacts.github}
          target="_blank"
          className={contacts.github ? "" : styles.empty}
        >
          <BsGithub />
        </Link>
      </div>
    </IconContext.Provider>
  );
};

export default SocialMediaIcons;
