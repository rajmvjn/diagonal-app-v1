import { useEffect, useState, useRef } from "react";
import { BASE_URL_API, BASE_URL_IMGS } from "./utils/constants";
import Shimmer from "./components/Shimmer";
import Card from "./components/Card";

import "./App.css";

function App() {
  const [plays, setPlays] = useState([]);
  const [playsFD, setPlaysFD] = useState([]);
  const [status, setStatus] = useState(null);
  const [sp, setSP] = useState(0);
  const elRef = useRef(null);
  const iRef = useRef(null);
  let listing = "";

  const fetchPlays = async () => {
    try {
      setStatus("pending");
      const res = await fetch(`${BASE_URL_API}page1.json`);
      const data = await res.json();
      setPlays(data?.page?.["content-items"]?.content);
      setPlaysFD(data?.page?.["content-items"]?.content);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  const handleScroll = () => {
    const scrollPosition = elRef.current.scrollTop;

    setSP((preSP) => {
      if (scrollPosition > 20 && preSP < 20) return scrollPosition;
      else if (scrollPosition < 20 && preSP > 20) return scrollPosition;
      else return preSP;
    });
  };

  useEffect(() => {
    fetchPlays();

    const element = elRef.current;
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filterHandler = () => {
    const flt = plays.filter((p) =>
      p.name.toLowerCase().includes(iRef.current.value.toLowerCase())
    );
    setPlaysFD(flt);
  };

  if (status === "pending") {
    listing = (
      <>
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
      </>
    );
  } else if (status === "error") {
    listing = (
      <div className="listing-error">
        Some error happend! Please try again..
      </div>
    );
  } else {
    listing = plays.length ? playsFD.map((p, i) => <Card p={p} key={i} />) : "";
  }

  return (
    <div className="App">
      <div className={`navbar ${sp > 20 ? "navbar-scroll" : ""}`}>
        <div className="navbar-items">
          <div className="item-list">
            <img
              alt="back"
              src={`${BASE_URL_IMGS}Back.png`}
              className="back-img"
            />
            <span className="header-text">Romantic Comedy</span>
          </div>
          <div className="item-list">
            <input type="text" className="search-text" ref={iRef} />
            <img
              src={`${BASE_URL_IMGS}search.png`}
              alt="search"
              className="search"
              onClick={filterHandler}
            />
          </div>
        </div>
      </div>
      <div className="listing" ref={elRef}>
        {listing}
      </div>
    </div>
  );
}

export default App;
