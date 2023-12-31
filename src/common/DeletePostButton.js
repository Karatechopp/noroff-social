import axios from "axios";
import { useState } from "react";
import { getProfileName, getToken } from "./LocalStorage";
import { BASE_API } from "../constants/api";
import { Link } from "react-router-dom";

function DeletePostButton({ postId }) {
  const [areYouSure, setAreYouSure] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const token = getToken();
  const url = BASE_API + "posts/" + postId;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  async function sendDeleteRequest() {
    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        setDeleteSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteClick = () => {
    setAreYouSure(true);
  };

  const noClick = () => {
    setAreYouSure(false);
  };

  const yesClick = () => {
    sendDeleteRequest();
  };

  if (deleteSuccess) {
    return (
      <>
        <div className="text-center">
          <h3 className="text-center text-3xl text-gray-900 dark:text-white font-semibold">Success!</h3>
          <p className="text-lg text-gray-900 dark:text-white">Post was deleted.</p>
          <p className="text-3xl">❌</p>
          <Link to={"/Profile?name=" + getProfileName()} className="mx-2">
            <button className="my-5 block mx-auto text-white bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center">
              Back to profile
            </button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {!areYouSure ? (
        <div className="flex flex-row justify-end max-w-sm mx-auto">
          <button
            onClick={deleteClick}
            className="my-5 block mx-auto text-white bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center"
          >
            Delete post
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-center text-lg text-gray-900 dark:text-white font-semibold">Delete post?</h3>
          <div className="flex flex-row justify-between max-w-sm mx-auto">
            <button
              onClick={yesClick}
              className="my-5 block mx-auto text-white bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              Yes
            </button>
            <button
              onClick={noClick}
              className="my-5 block mx-auto text-white bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              No
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default DeletePostButton;
