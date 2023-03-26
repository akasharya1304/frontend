import axios from "axios";
import OverView from "../UI/overView";
import HOST from "../../constants/host";

const Home = () => {

  const handleSaveSubmit = (data) => {
    axios.post(`${HOST}post`,data).then((res) => {
      if (res.status === 200) { 
        console.log(res.data)
      }
    })
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        minHeight: "calc(100vh - 60px)",
        border: "1px solid black",
      }}
    >
    <h1>{window.location.href}</h1>
      <OverView 
        handleSaveSubmit={handleSaveSubmit} 
        />
    </div>
  );
};

export default Home;
