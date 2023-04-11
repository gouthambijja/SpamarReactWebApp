import {
  faCheckSquare,
  faEdit,
  faPlus,
  faSave,
  faSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toggleDisplay } from "../features/reducerSlices/addSpamarSlice";
import {
  clearSpamar,
  editSpamar,
  toggleSpamar,
} from "../features/reducerSlices/SpamarsSlice";
import { getSpamarIndexById } from "../SpamarApp";

function IndividualSpamar() {
  const [present, setPresent] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const DescriptionRef = useRef(null);
  const Spamars = useSelector((store) => store.Spamar.Spamars);
  const [editState, setEditState] = useState(false);
  const index = getSpamarIndexById(Spamars, id);
  useEffect(() => {
    if (index === -1) {
      setPresent(false);
    } else {
      setPresent(true);
    }
  }, []);
  const editHandler = async () => {
    setEditState(!editState);
    if (!editState) {
      titleRef.current.contentEditable = true;
      DescriptionRef.current.contentEditable = true;
      titleRef.current.style.background = "rgba(0,0,0,0.3)";
      DescriptionRef.current.style.background = "rgba(0,0,0,0.3)";
    } else {
      titleRef.current.contentEditable = false;
      DescriptionRef.current.contentEditable = false;
      titleRef.current.style.background = "none";
      DescriptionRef.current.style.background = "none";
      const editedContent = {
        userId: Spamars[index].userId,
        title: titleRef.current.innerText,
        description: DescriptionRef.current.innerText,
        check: Spamars[index].check,
        id: id,
      };
      try {
        let data = await fetch(`http://localhost:8080/Spamars/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(editedContent),
        });
        if (data.ok) {
          dispatch(editSpamar({ id: index, editedContent: editedContent }));
          //   dispatch(toggleSpamar({ id: id }));
          //   setcheckLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const DeleteHandler = async (e) => {
    e.currentTarget.setAttribute("disabled", "");
    const del = await fetch(`http://localhost:8080/Spamars/${id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!del.ok) {
      e.currentTarget.removeAttribute("disabled");
    } else {
      dispatch(clearSpamar({ id: id }));
      navigate(-1);
    }
  };
  const SpamarCheckHandler = async () => {
    const index = getSpamarIndexById(Spamars, id);
    try {
      let data = await fetch(`http://localhost:8080/Spamars/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          check: !Spamars[index].check,
        }),
      });
      if (data.ok) {
        dispatch(toggleSpamar({ id: id }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="SpamarsOuterContainer">
      <div className="sideBar">
        {" "}
        <div
          tooltip={editState ? "save" : "edit"}
          tooltip-position="right"
          className="sideBar-button"
          onClick={editHandler}
        >
          {!editState ? (
            <FontAwesomeIcon icon={faEdit} />
          ) : (
            <FontAwesomeIcon icon={faSave} />
          )}
        </div>
        <div
          tooltip="delete"
          tooltip-position="right"
          className="sideBar-button"
          onClick={DeleteHandler}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          tooltip={
            Spamars && Spamars[index] && !Spamars[index].check ? "check" : "uncheck"
          }
          tooltip-position="right"
          className="sideBar-button"
          onClick={SpamarCheckHandler}
        >
          {Spamars && Spamars[index] && !Spamars[index].check ? (
            <FontAwesomeIcon icon={faSquare} />
          ) : (
            <FontAwesomeIcon icon={faCheckSquare} />
          )}
        </div>
      </div>

      <div className="SpamarsContainer individualSpamarsContainer">
        <div className="individualSpamar">
          <div className="innerIndividualSpamar">
            <h1 ref={titleRef} className="individualTitle">
              {Spamars && Spamars[index] ? Spamars[index].title : ""}
            </h1>
            <p ref={DescriptionRef} className="individualDescription">
              {Spamars && Spamars[index] ? Spamars[index].description : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualSpamar;
