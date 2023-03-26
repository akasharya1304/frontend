import { useEffect, useState } from "react";
import axios from "axios";
import HOST from "../../constants/host";
import { CircularProgress, Divider } from "@mui/material";
import { bodyColor, bodyColorBox, gain, loss, whiteColor } from "../../constants/color";
import { pxToEm } from "../../method";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";

const Record = () => {
  const [dataFetch, setDataFetch] = useState([]);

  useEffect(() => {
    axios.get(`${HOST}allData`).then((res) => {
      if (res.status === 200) {
        console.log("here", res.data);
        setDataFetch(res.data);
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        minHeight: "calc(100vh - 60px)",
        border: "1px solid black",
      }}
    >
    <h1>{window.location.href}</h1>
      {dataFetch.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {dataFetch.slice(0, 1).map((d) => {
            return (
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  fontFamily: "Poppins",
                  fontSize: pxToEm(14),
                  fontWeight: 800,
                }}
              >
                <p style={{ width: "30%", paddingLeft: 10 }}>Date - Time</p>

                <p style={{ width: "20%" }}>{d[2]}</p>
                <p style={{ width: "30%" }}>{d[4]}</p>
                <p style={{ width: "20%", textAlign: "center" }}>Cash Flow</p>
              </div>
            );
          })}
          <Divider />
          {dataFetch
            .slice(1)
            .reverse()
            .map((d) => {
              return (
                <div
                  style={{
                    backgroundColor: bodyColorBox,
                    // borderRadius: 10
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "Poppins",
                      fontSize: pxToEm(13),
                      fontWeight: 700,
                      padding: "20px 0",
                      color: '#222'
                    }}
                  >
                    <span style={{ width: "30%", paddingLeft: 10 }}>
                      {d[0]}
                      <p style={{ margin: 0 }}>{d[1]}</p>
                    </span>
                    <span style={{ width: "20%" }}>₹ {d[2]}</span>
                    <span
                      style={{
                        width: "30%",
                        overflowWrap: "break-word",
                        paddingRight: 10,
                      }}
                    >
                      {d[4]}
                    </span>
                    <span style={{ width: "20%", paddingRight: 10 }}>
                      {d[3] === "paid" ? (
                        <p
                          style={{
                            display: "flex",
                            margin: 0,
                            color: loss,
                            justifyContent: "center",
                          }}
                        >
                          <CallMadeIcon /> Paid
                        </p>
                      ) : (
                        <p
                          style={{
                            display: "flex",
                            margin: 0,
                            color: gain,
                            justifyContent: "center",
                          }}
                        >
                          <CallReceivedIcon /> Received
                        </p>
                      )}
                    </span>
                  </div>
                  <Divider />
                </div>
              );
            })}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Record;
