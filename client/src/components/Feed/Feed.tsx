import React, { useState, useEffect } from "react";
import { Avatar, Tooltip } from "@mui/material";
import "./Feed.css";
import { format } from "timeago.js"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deletePost } from "../../actions/posts"
import { useSelector, useDispatch } from "react-redux";

type Props = {
  posts: any,
}

type UserType = {
  username: string
  email: string
  _id: number
}

const Feed = (props: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [postUser, setPostUser] = useState<UserType>({
    username: "",
    email: "",
    _id: 0
  })
  useEffect(() => {
    axios.get(`https://socialuwu.herokuapp.com/api/users/getbyid/${props?.posts?.userId}`).then((response) => {
      setPostUser(response.data);
    })
  }, [axios])
  const profileRedirect = () => {
    navigate("/profile/" + postUser?._id);
  }
  const userboi = useSelector((user: any) => user?.user?.authData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //@ts-ignore
  const token = JSON.parse(localStorage.getItem("token"));
  //@ts-ignore  
  const tokenboi = token?.token

  const deletePostboi = () => {
    handleClose()
    dispatch(deletePost(props?.posts?._id, tokenboi))
  }
  return (
    <div className="feed">
      <div className="header">
        <div className="user">
          <div className="pfpboi">
            <Tooltip title={postUser?.username}>
              <Avatar src="" alt="" sx={{
                width: 48,
                height: 48,
                cursor: "pointer"
              }} onClick={profileRedirect} />
            </Tooltip>
          </div>
          <div className="userinfo">
            <h3>{postUser?.username}</h3>
            <small>{format(props?.posts?.createdAt)}</small>
          </div>
        </div>
        {props?.posts?.userId === userboi?._id ? <span className="edit" onClick={handleClick}>
          <i className="uil uil-ellipsis-v"></i>
        </span> : ""}
      </div>
      <div className="image">
        <img
          alt=""
          src={props?.posts?.image}
        />
      </div>
      <div className="buttons">
        <div className="rightbuttons">
          <div style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px"
          }}>
            <span>
              <i className="uil uil-heart"></i>
            </span>
            <p style={{
              color: "black",
              fontSize: "16px"
            }}>{props?.posts?.likes?.length}</p>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px"
          }}>
            <span>
              <i className="uil uil-comment"></i>
            </span>
            <p style={{
              color: "black",
              fontSize: "16px"
            }}>{props?.posts?.comments?.length}</p>
          </div>
          <span>
            <i className="uil uil-megaphone"></i>
          </span>
        </div>
        <div className="leftbuttons">
          <span>
            <i className="uil uil-bookmark"></i>
          </span>
        </div>
      </div>
      <div className="caption">
        <span>
          {props?.posts?.caption}
        </span>
      </div>
      <p className="viewcomments">View all comments</p>
      {/* edit delete menu  */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <i className="uil uil-edit" style={{
            fontSize: "1.2rem",
            color: "#1d94d6"
          }}></i>
          <p style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#1d94d6"
          }}>Edit Post</p>
        </MenuItem>
        <MenuItem onClick={deletePostboi} style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <i className="uil uil-trash-alt" style={{
            fontSize: "1.2rem",
            color: "#d74545"
          }}></i>
          <p style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#d74545"
          }}>Delete Post</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Feed;
