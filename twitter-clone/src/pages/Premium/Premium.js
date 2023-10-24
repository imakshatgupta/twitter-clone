import React , {useEffect} from "react";
import { useUserAuth } from "../../context/UserAuthContext";

import "./Premium.css";

const Premium = () => {
  const { user } = useUserAuth();

  const [aplan, setAplan] = React.useState("");
  const [plan, setPlan] = React.useState("");


  useEffect(() => {
      fetch('http://localhost:5000/loggedInUser')
          .then(res => res.json())
          .then(data => {
              setAplan(data[0]);
          })
  }, [aplan])

  console.log(aplan);


  const makePaymentSilver = () => {
    setPlan("2");
    const editedInfo = {
      plan,
    };
    console.log(editedInfo);
    fetch(`http://localhost:5000/userUpdates/${user?.email}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

      });
  };

  return (
    <div className="subscriptions-container">
      <h2>Choose Your Plan</h2>
      <div className="plans">
        <div className="plan-card">
          <h3>Free Plan</h3>
          <p>Free</p>
          <p>Tweets Per Day: 1 </p>
        </div>

        <div className="plan-card" onClick={ makePaymentSilver}>
          <h3>Silver Plan</h3>
          <p>₹100/month</p>
          <p>Tweets Per Day: 5 </p>
        </div>
        <div
          className="plan-card"
          // onClick={() => makePaymentGold }
        >
          <h3>Gold Plan</h3>
          <p>₹1000/month</p>
          <p>Tweets Per Day: Unlimited </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;
