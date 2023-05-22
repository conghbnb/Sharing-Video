import { Button, Wrapper } from "./navbar.styled";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import LoginOrRegisterForm from "./loginOrResgisterForm";
import { logout } from "../../store/slices/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Wrapper>
      <div className="logo" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHome} />
        <span> Funny Movies</span>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <div>Wellcome {user.email}</div>
            <Button onClick={() => navigate("/share")}>Share a movie</Button>
            <Button onClick={() => dispatch(logout())}>Logout</Button>
          </>
        ) : (
          <LoginOrRegisterForm />
        )}
      </div>
    </Wrapper>
  );
};

export default Navbar;
