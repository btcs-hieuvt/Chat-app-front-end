import axios from "axios";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { firebaseLoginRoute } from "../utils/APIRoutes";
import { firebaseAuth } from "../utils/firebaseConfig";

function SocialLoginButton() {
  const navigate = useNavigate();
  const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    github: new GithubAuthProvider(),
  };
  const firebaseLogin = async (loginType) => {
    try {
      const provider = providers[loginType];
      const userData = await signInWithPopup(firebaseAuth, provider);
      const email = userData.user.email
        ? userData.user.email
        : userData.user.providerData[0].email;
      const { data } = await axios.post(firebaseLoginRoute, { email });
      if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        navigate("/setusername");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center gap-4 bg-transparent">
      <button
        type="button"
        className="common-btn"
        onClick={() => firebaseLogin("google")}
      >
        <BsGoogle />
      </button>
      <button
        type="button"
        className="common-btn"
        onClick={() => firebaseLogin("facebook")}
      >
        <BsFacebook />
      </button>
      <button
        type="button"
        className="common-btn"
        onClick={() => firebaseLogin("github")}
      >
        <BsGithub />
      </button>
    </div>
  );
}

export default SocialLoginButton;
