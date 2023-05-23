import { useEffect } from "react";
import { AuthToken } from "./authToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { User } from "./types";
import { getUser } from "./store/reducers/user.slice";
import { useNavigate } from "react-router-dom";

export default function LoadAuthUser() {
  const user = useSelector<RootState, User>(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = AuthToken.get();
    if (!token || user.isAuthenticated) {
      navigate('/login')
      return;
    }

    dispatch(getUser())

  }, []);

  return null
}
