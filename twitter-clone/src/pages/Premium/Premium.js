import React, {useState} from 'react'
import { useUserAuth } from "../../context/UserAuthContext"

import "./SubscriptionsPage.css";

const Premium = () => {
    const { user } = useUserAuth();
    
    
    const [selectedPlan, setSelectedPlan] = useState(null);
  const [plan, setPlan] = React.useState('')


  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setPlan(plan);
        const editedInfo = {
            plan,
        }
        console.log(editedInfo);
        fetch(`http://localhost:5000/userUpdates/${user?.email}`, {
          method: "PATCH",
          headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(editedInfo),
    })
    .then(res => res.json())
    .then(data => {
        console.log('done', data);
          })
    }
    
    const plans = [
    {
        id: "1",
      name: "Free Plan",
      price: "Free",
      tweetsPerDay: 1,
    },
    {
      id: "2",
      name: "Silver Plan",
      price: "₹100/month",
      tweetsPerDay: 5,
    },
    {
      id: "3",
      name: "Gold Plan",
      price: "₹1000/month",
      tweetsPerDay: "Unlimited",
    },
  ];
  
  return (
    <div className="subscriptions-container">
      <h2>Choose Your Plan</h2>
      <div className="plans">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan === plan.id ? "selected" : ""}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <h3>{plan.name}</h3>
            <p>{plan.price}</p>
            <p>{`Tweets Per Day: ${plan.tweetsPerDay}`}</p>
          </div>
        ))}
      </div>
      {selectedPlan && (
        <div className="selected-plan-info">
          <h2>Selected Plan: {plans.find((plan) => plan.id === selectedPlan).name}</h2>
          <p>
            You can post{" "}
            {plans.find((plan) => plan.id === selectedPlan).tweetsPerDay} tweets per day.
          </p>
        </div>
      )}
    </div>
  );
};



export default Premium