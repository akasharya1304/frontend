import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import moment from "moment";

import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import {
  bodyColor,
  bodyColorBox,
  disabledColor,
  gain,
  loss,
  whiteColor,
} from "../../constants/color";

const OverView = (props) => {
  const {
    dateValue,
    timeValue,
    amountValue,
    cashFlowValue,
    descriptionValue,
    operation,
    handleSaveSubmit,
  } = props;
  const [fieldValue, setFieldValue] = useState({
    dateValue: moment(new Date()).format("DD MMM YYYY"),
    timeValue: moment(new Date()).format("hh : mm : ss  A"),
    amount: "",
    cashFlow: "",
    description: "",
  });

  useEffect(() => {
    if (operation === "update") {
      setFieldValue(() => {
        return {
          dateValue: dateValue,
          timeValue: timeValue,
          amount: Number(amountValue),
          cashFlow: cashFlowValue,
          description: descriptionValue,
        };
      });
    }
  }, [dateValue, timeValue, amountValue, cashFlowValue, descriptionValue]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFieldValue((prevValue) => {
      return {
        ...prevValue,
        [name]: name === "amount" ? Number(value) : value,
      };
    });
    console.log(fieldValue);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: 20,
        borderRadius: 15,
        backgroundColor: bodyColorBox,
        border: "1px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <TextField
          style={{ margin: 10, flexGrow: 1 }}
          InputProps={{ readOnly: true }}
          label="Date"
          type="text"
          margin="dense"
          variant="outlined"
          value={
            fieldValue.dateValue || moment(new Date()).format("DD MMM YYYY")
          }
        />
        <TextField
          style={{ margin: 10, flexGrow: 1 }}
          InputProps={{ readOnly: true }}
          label="Time"
          type="text"
          margin="dense"
          variant="outlined"
          value={
            fieldValue.timeValue || moment(new Date()).format("hh : mm : ss  A")
          }
        />
      </div>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <TextField
            style={{ margin: 10, flexGrow: 1 }}
            name="amount"
            label="Amount"
            type="text"
            placeholder="Enter Amount"
            margin="dense"
            variant="outlined"
            onKeyPress={(event) => {
              if (event.charCode >= 48 && event.charCode <= 57) {
                // let it happen, don't do anything
              } else {
                event.preventDefault();
              }
            }}
            value={fieldValue.amount}
            onChange={handleChangeValue}
          />
          <FormControl>
            <RadioGroup aria-labelledby="cashFlow" name="cashFlow">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: bodyColorBox,
                  borderRadius: 15,
                  padding: "0 10px",
                  color: gain,
                  fontWeight: "bolder",
                }}
              >
                <FormControlLabel
                  value="received"
                  control={<Radio style={{ color: gain }} />}
                  onChange={handleChangeValue}
                />
                <p style={{ display: "flex", margin: 0 }}>
                  <CallReceivedIcon /> Received
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: bodyColorBox,
                  borderRadius: 15,
                  padding: "0 10px",
                  color: loss,
                  fontWeight: "bolder",
                }}
              >
                <FormControlLabel
                  value="paid"
                  control={<Radio style={{ color: loss }} />}
                  onChange={handleChangeValue}
                />
                <p style={{ display: "flex", margin: 0 }}>
                  <CallMadeIcon /> Paid
                </p>
              </div>
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <TextField
        style={{ margin: 10 }}
        name="description"
        label="Description"
        type="text"
        multiline
        placeholder="Enter Description"
        margin="dense"
        variant="outlined"
        value={fieldValue.description}
        onChange={handleChangeValue}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: 10,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<CheckOutlinedIcon />}
          style={{
            width: "50%",
            backgroundColor:
              fieldValue.amount === "" ||
              fieldValue.cashFlow === "" ||
              fieldValue.description === ""
                ? disabledColor
                : gain,
            color:
              fieldValue.amount === "" ||
              fieldValue.cashFlow === "" ||
              fieldValue.description === ""
                ? disabledColor
                : whiteColor,
          }}
          disabled={
            fieldValue.amount === "" ||
            fieldValue.cashFlow === "" ||
            fieldValue.description === ""
          }
          onClick={() => {
            handleSaveSubmit(fieldValue);
            setFieldValue({
              dateValue: moment(new Date()).format("DD MMM YYYY"),
              timeValue: moment(new Date()).format("hh : mm : ss  A"),
              amount: "",
              cashFlow: "",
              description: "",
            });
          }}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default OverView;
