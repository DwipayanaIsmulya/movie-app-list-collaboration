import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerLoginWithGoogleAction } from "../../redux/actions/googleActions";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(
        registerLoginWithGoogleAction(responseGoogle.access_token, navigate)
      ),
    onError: (errorResponse) => {
      alert(errorResponse.error_description);
    },
  });

  return (
    <Button
      variant="outline-secondary"
      style={{ width: "100%", height: "45px" }}
      onClick={() => loginWithGoogle()}
    >
      {buttonText} Sign in with Google
    </Button>
  );
}

GoogleLogin.propTypes = {
  buttonText: PropTypes.object,
};

export default GoogleLogin;
