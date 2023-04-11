import { redirect } from "react-router-dom";
import { logInUser } from "./features/reducerSlices/userSlice";
import store from "./app/store";
import axios from "axios";
import { initializeStoreAction } from "./features/reducerSlices/SpamarsSlice";

const actions = async ({ request }) => {
  const data = await request.formData();
  const submission = {
    password: data.get("password"),
    id: data.get("userId"),
  };
  if (submission.id) {
    let res = await fetch(`http://localhost:8080/users/?id=${submission.id}`);
    res = await res.json();
    if (res.length > 0 && submission.password === res[0].password) {
      store.dispatch(logInUser(submission.id));
      let data = await axios.get(
        `http://localhost:8080/Spamars?userId=${submission.id}`
      );
      store.dispatch(initializeStoreAction(data.data));
      window.localStorage.setItem("userId", submission.id);
      return redirect("home");
    }
  }
  return redirect("/");
};

export default actions;
