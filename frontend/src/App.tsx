import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";




function App() {
  console.log(useAuth()?.isLoggedIn);
  const auth = useAuth();

//in app.tsx --> protected route --> /chat we can only enable this route once we have auth logged in only
  return (<main>
    <Header/>
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/login" element = {<Login/>}/>
      <Route path="/Signup" element = {<Signup/>}/>
  
      {auth?.isLoggedIn && auth.user && (<Route path="/Chat" element = {<Chat/>}/>)}
      <Route path="*" element = {<NotFound/>}/>
      

    </Routes>
    
  </main>
  );
}

export default App
