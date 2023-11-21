import { useContext } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { StateContext } from "./contexts";

export default function UserBar() {
  const { state, dispatch: dispatchUser } = useContext(StateContext);
  const { user } = state;
  //console.log("user:", user);
  if (user) {
    return (
      <>
        <Logout user={user.username} dispatchUser={dispatchUser} />
      </>
    );
  } else {
    return (
      <>
        <Login dispatchUser={dispatchUser} />
        <Register dispatchUser={dispatchUser} />
      </>
    );
  }
}
