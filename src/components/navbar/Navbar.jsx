import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { useCookies } from "react-cookie";

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
      {/* {!cookies.access_token ? ( */}
        <Link to="/home" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">BOOKING</span></Link>   
        {/*      ) : (
        <> */}
        {/* {user ? user.username : (<div className="navItems"> */}
        {/* )}   </> */}
      {/* )} */}
      
        <button onClick={logout}>Logout</button>
       
      </div>
    </div>
  )
}

export default Navbar