import React, { Fragment } from "react";
import './avatar.css'

const Avatar = ({ name="", imageUrl }) => {
  console.log(imageUrl)
  return (
    <Fragment>
      <div className='container'>
        {imageUrl && (
          <img className='avatarImage' alt="avatar" src={imageUrl} />
        )}
        {imageUrl === undefined && name !== "" && (
          <div className='avatatext'>{name.substring(0, 2)}</div>
        )}
        <div className='online-status'></div>
      </div>
    </Fragment>
  );
};

export default Avatar;
