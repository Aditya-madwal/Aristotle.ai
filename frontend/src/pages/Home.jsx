import React, { useEffect, useState } from "react";
import api from "../api";
import { useContext } from "react";
import { MyContext } from "../MyContext";

const Home = () => {
  const { me, setMe } = useContext(MyContext);
  const [myinfo, setMyinfo] = useState(null);
  useEffect(() => {
    me ? setMyinfo(me) : null;
  }, [me]);

  return <div>helllo {myinfo?.username}</div>;
};

export default Home;
