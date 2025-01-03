import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./chatBot.module.css";
// import bot from "../../assets/profile-bot.png";
// import send from "../../../assets/send";
import axios from "axios";

const ChatBot = () => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]); // Store chat history
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [currentValue, setCurrentValue] = useState(""); // To store current input value

  const { linkId } = useParams();
  // const id = localStorage.getItem("linkId"); // Get linkId from localStorage

  useEffect(() => {
    // Fetch form data from the backend using Axios
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/forms/share/${linkId}`);
        if (response.data.success) {
          setForm(response.data.form);
        } else {
          alert("Form not found");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, [linkId]);

  // Function to handle bubble field progression
  const handleBubbleResponse = () => {
    const currentField = form.fields[currentFieldIndex];
    const newResponse = {
      label: currentField.label,
      answer: currentField.value, // Bubble value is static
      type: "bubble", // Mark it as a bubble
    };

    const updatedResponses = [...responses, newResponse];

    setResponses(updatedResponses);

    // Check if it's the last field and mark as completed
    if (currentFieldIndex === form.fields.length - 1) {
      setFormCompleted(true);
      submitForm(updatedResponses); // Save responses to the backend
    } else {
      setCurrentFieldIndex(currentFieldIndex + 1);
    }
  };

  // Function to handle input field submission
  const handleInputSubmit = async (value) => {
    const currentField = form.fields[currentFieldIndex];
    const newResponse = {
      label: currentField.label,
      answer: value,
      type: "input", // Mark it as an input
    };

    const updatedResponses = [...responses, newResponse];

    // Check if it's the last field and mark as completed
    if (currentFieldIndex === form.fields.length - 1) {
      setFormCompleted(true); // Form completed
      await submitForm(updatedResponses); // Pass the updated responses array
    } else {
      setResponses(updatedResponses); // Update responses state
      setCurrentFieldIndex(currentFieldIndex + 1); // Move to the next field
    }
  };

  // Submit form data to backend
  const submitForm = async (finalResponses) => {
    try {
      const response = await axios.post(`${apiUrl}/api/forms/save-response`, {
        formId: form._id,
        responses: finalResponses, // Submit the final set of responses
      });

      if (response.data.success) {
        alert("Thank you for completing the form!");
      } else {
        alert("Error submitting form responses");
      }
    } catch (error) {
      console.error("Error submitting form responses:", error);
    }
  };

  useEffect(() => {
    if (form && form.fields.length > 0) {
      const currentField = form.fields[currentFieldIndex];

      // If it's a bubble field, proceed to the next one automatically after a short delay
      if (currentField.type === "bubble") {
        setTimeout(() => {
          handleBubbleResponse();
        }, 1000); // Delay before moving to the next bubble field
      }
    }
  }, [currentFieldIndex, form]);

  if (!form) {
    return <div>Loading form...</div>;
  }

  const currentField = form.fields[currentFieldIndex];

  return (
    <div className={style.container}>
      <div className={style.chatContainer}>
        <h2>{form.name}</h2>
        <div className={style.chatBox}>
          {/* Render all previous responses as a chat */}
          {responses.map((response, index) => (
            <div
              className={style.Chat}
              key={index}
              style={{ marginBottom: "10px" }}
            >
              {/* <strong>{response.type === 'bubble' ? 'Chatbot' : 'You'}: </strong> */}
              {response.type === "bubble" ? (
                <div className={style.bubbleDiv}>
                  {/* <img src={bot} alt="bot" className={style.botImg} /> */}
                  <button className={style.bubbleStyle}>
                    {response.answer}
                  </button>
                </div>
              ) : (
                <div className={style.inputDiv}>
                  <button className={style.inputStyle}>
                    {response.answer}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Render the current field based on its type */}
        {currentField.type === "bubble" ? (
          <div>
            <p>{currentField.label}</p>
            {/* The field will automatically proceed without clicking */}
            <p>{currentField.value}</p>
          </div>
        ) : (
          <div className={style.inputContainer}>
            {/* <label>{currentField.label}</label> */}
            <input
              type={currentField.inputType}
              placeholder={`Enter your ${currentField.label.toLowerCase()}`}
              style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
            <button
              onClick={() => {
                handleInputSubmit(currentValue);
                setCurrentValue(""); // Clear input field after submission
              }}
              style={{
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              Send
            </button>
          </div>
        )}

        {/* Show Thank You message only if form is completed */}
        {formCompleted && (
          <div style={{ marginTop: "20px" }}>
            <h3>Thank you for filling out the form!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
