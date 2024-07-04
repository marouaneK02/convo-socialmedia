import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";
import useRecoilValue from "recoil";
import authScreenAtom from "../atoms/authAtom";


const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  const [ value, setValue] = useState("login");

    return (
    <>
        {authScreenState === "login" ? <LoginCard/> : <SignupCard/>}
    </>
  )
}

export default AuthPage