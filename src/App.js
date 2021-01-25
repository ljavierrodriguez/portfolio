import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Home from "./views/home";
import NotFound from "./views/notfound";

const App = () => {

  const [state, setState] = useState({
    user: null,
  });

  useEffect(() => {

    getUser("https://api.github.com/users/ljavierrodriguez");

    return () => {

    }
  }, [])

  /* const getUser = (url) => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setState({
          ...state,
          user: data
        })
      })
  } */

  const getUser = async (url) => {

    try {
      const resp = await fetch(url);
      const data = await resp.json();

      setState({
        ...state,
        user: data
      })
    }catch(error){
      console.warn(error.message);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Header user={state.user} />
        <div className="main-wrapper">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;