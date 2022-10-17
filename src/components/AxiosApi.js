import { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";

const AxiosApi = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  // using Async Await
  const getMyPostData = async () => {
    try {
      const res = await axios.get("https://api.ilmil.com/api/questions/posts");
      setMyData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  // NOTE:  calling the function
  useEffect(() => {
    getMyPostData();
  }, []);

  return (
    <>
      <h1>Axios Tutorial</h1>
      {isError !== "" && <h2>{isError}</h2>}

      <div className="grid">
        {myData.slice(0, 9).map((post) => {
          const { question } = post;
          return (
            <div  className="card">
              <h2>{question}</h2>
              {/* <p>{body.slice(0, 100)}</p> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AxiosApi;