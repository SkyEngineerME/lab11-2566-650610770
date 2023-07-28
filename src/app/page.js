"use client";
import { useState } from "react";

export default function RegisFormPage() {
  const [fname, setFname] = useState("");
  const [fnameError, setFnameError] = useState(false);
  const [lname, setLname] = useState("");
  const [lnameError, setlnameError] = useState(false);
  const [plan, setPlan] = useState("");
  const [planError, setplanError] = useState(false);
  const [gender, setGender] = useState(null);
  const [genderError, setgenderError] = useState(false);
  const [register, setregister] = useState(false);
  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);

  const inputFnameOnChange = (event) => {
    setFnameError(false);
    setFname(event.target.value);
  };

  const inputLnameOnChange = (event) => {
    setlnameError(false);
    setLname(event.target.value);
  };

  const selectPlanOnChange = (event) => {
    setplanError(false);
    setPlan(event.target.value);
  };
  const argeeOnchange = (event) => {
    setregister(event.target.checked);
  };

  const radioGenderMaleOnChange = () => {
    setGender("male");
    setgenderError(false);
  };

  const radioGenderFemaleOnChange = () => {
    setGender("female");
    setgenderError(false);
  };

  const cbBuyBottleOnChange = (event) => {
    setBuyBottle(event.target.checked);
  };

  const cbBuyShoesOnChange = (event) => {
    setBuyShoes(event.target.checked);
  };

  const cbBuyCapOnChange = (event) => {
    setBuyCap(event.target.checked);
  };

  function computeTotalPayment() {
    let total = 0;
    if (plan === "funrun") total += 500;
    if (plan === "mini") total += 800;
    if (plan === "half") total += 1200;
    if (plan === "full") total += 1500;
    if (buyBottle) total += 200;
    if (buyShoes) total += 600;
    if (buyCap) total += 400;
    if (buyBottle && buyCap && buyShoes) {
      total *= 0.8;
    }

    return total;
  }

  const registerBtnOnClick = () => {
    let fnameOk = true;
    let lnameOk = true;
    let planOk = true;
    let genderOk = true;
    if (fname === "") {
      fnameOk = false;
      setFnameError(true);
    }
    if (lname === "") {
      lnameOk = false;
      setlnameError(true);
    }
    if (plan === "") {
      planOk = false;
      setplanError(true);
    }
    if (gender === null) {
      genderOk = false;
      setgenderError(true);
    }
    if (genderOk && planOk && lnameOk && fname) {
      alert(
        `Registration complete. Please pay money for ${computeTotalPayment().toLocaleString()} THB.`
      );
    }
  };

  return (
    <div className="mx-auto vstack gap-3" style={{ width: "400px" }}>
      <h3 className="text-center fst-italic">Register CMU Marathon 🏃‍♂️</h3>
      {/* First name & Last name */}
      <div className="d-flex gap-2">
        <div>
          <label className="form-label">First name</label>
          <input
            className={"form-control" + (fnameError ? " is-invalid" : "")}
            onChange={inputFnameOnChange}
            value={fname}
          />
          <div className="invalid-feedback">Invalid first name</div>
        </div>
        <div>
          <label className="form-label">Last name</label>
          <input
            className={"form-control" + (lnameError ? " is-invalid" : "")}
            onChange={inputLnameOnChange}
            value={lname}
          />
          <div className="invalid-feedback">Invalid last name</div>
        </div>
      </div>

      {/* Running Plan */}
      <div>
        <label className="form-label">Plan</label>
        <select
          className={"form-select" + (planError ? " is-invalid" : "")}
          onChange={selectPlanOnChange}
          value={plan}
        >
          <option value="">Please select..</option>
          <option value="funrun">Fun run 5.5 Km (500 THB)</option>
          <option value="mini">Mini Marathon 10 Km (800 THB)</option>
          <option value="half">Half Marathon 21 Km (1,200 THB)</option>
          <option value="full">Full Marathon 42.195 Km (1,500 THB)</option>
        </select>
        <div className="invalid-feedback">Please select a Plan</div>
      </div>

      {/* Gender */}
      <div>
        <label className="form-label">Gender</label>
        <div>
          <input
            className="me-2 form-check-input"
            type="radio"
            onChange={radioGenderMaleOnChange}
            checked={gender === "male"}
          />
          Male 👨
          <input
            className="mx-2 form-check-input"
            type="radio"
            onChange={radioGenderFemaleOnChange}
            checked={gender === "female"}
          />
          Female 👩
          {/* To show error when user did not select gender, */}
          {/* We just have to render the div below (Not using is-invalid bootstrap class) */}
          {genderError && (
            <div className="text-danger">Please select gender</div>
          )}
        </div>
      </div>

      {/* Extra Items */}
      <div>
        <label className="form-label">Extra Item(s)</label>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyBottleOnChange}
            checked={buyBottle}
          />{" "}
          <label className="form-check-label">Bottle 🍼 (200 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyShoesOnChange}
            checked={buyShoes}
          />{" "}
          <label className="form-check-label">Shoes 👟 (600 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyCapOnChange}
            checked={buyCap}
          />{" "}
          <label className="form-check-label">Cap 🧢 (400 THB)</label>
        </div>
      </div>

      <div className="alert alert-primary" role="alert">
        Promotion📢 Buy all items to get 20% Discount
      </div>

     
      <div>
        Total Payment : {computeTotalPayment().toLocaleString()} THB
        {/* Render below element conditionally when user get 20% discount */}
        {buyBottle && buyCap && buyShoes && (
          <span className="text-success d-block">(20% Discounted)</span>
        )}
      </div>

      {/* Terms and conditions */}
      <div>
        <input className="me-2" type="checkbox" onChange={argeeOnchange} />I
        agree to the terms and conditions
      </div>

      {/* Register Button */}
      <button
        className="btn btn-success my-2"
        disabled={!register}
        onClick={registerBtnOnClick}
        
      >
        Register
      </button>
    </div>
  );
}
