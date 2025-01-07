import React from "react";
import { useState, useEffect } from "react";
import style from "./formWorkspace.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../DarkNLight";
import Responses from "../response/Response";
import { useNavigate, useParams } from "react-router-dom";

const FormWorkspace = () => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [fields, setFields] = useState([]);
  const [formResponse, setFormResponse] = useState([]);
  const [formName, setFormName] = useState("");
  const [fId, setformId] = useState(null);
  const [res, setRes] = useState(true);
  const [len, setLen] = useState(0);

  const { folderId, formId } = useParams();

  // Fetch form data when the component mounts
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        if (formId) {
          const response = await axios.get(
            `${apiUrl}/api/forms/form/${formId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const formLength = response.data.form.fields;
          setLen(formLength.length);
          if (response.data.success) {
            const form = response.data.form;
            setFormName(form.name); // Set form name
            setFields(form.fields); // Set the form fields (bubbles and inputs)
            setFormResponse([response.data.form]);
          }
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, [formId]); // Only fetch data once when formId changes or component mounts

  // Handle adding a bubble
  const addBubble = (type) => {
    const newField = {
      label: `${type}`,
      type: "bubble",
      sequence: fields.length + 1,
      prefilled: true, // Bubble will have prefilled data
      value: "", // Editable for the form creator
    };
    setFields([...fields, newField]);
  };

  // Handle adding an input field
  const addInput = (inputType) => {
    const newField = {
      label: `${inputType.charAt(0).toUpperCase() + inputType.slice(1)}`,
      type: "input",
      inputType: inputType,
      sequence: fields.length + 1,
      value: "", // Editable input field for user
    };
    setFields([...fields, newField]);
  };

  // Handle updating field value for both bubble and input fields
  const handleFieldChange = (index, newValue) => {
    const updatedFields = [...fields];
    updatedFields[index].value = newValue; // Update the value in state
    setFields(updatedFields);
  };

  // Handle saving the form data
  const saveForm = async () => {
    if (len > 0) {
      updateForm();
    } else {
      try {
        // const selectedFolderId = localStorage.getItem("folderId"); // Retrieve the folder ID from localStorage

        if (!folderId) {
          alert("Please select a folder to save the form bot.");
          return;
        }

        const response = await axios.post(
          `${apiUrl}/api/folders/create-form-bot`, // POST request to save  the form
          {
            folderId: folderId, // folder where formbot should be save
            formBotName: formName, // Form name
            fields: fields, // Updated fields (contains both bubbles and inputs)
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setformId(response.data.formBot._id);

        if (response.data.success) {
          toast.success("Form Save successfull", { position: "top-center" });
        }
      } catch (error) {
        console.error("Error Saving form:", error);
      }
    }
  };

  // Handle saving the updated form data
  const updateForm = async () => {
    try {
      // const selectedFolderId = localStorage.getItem("folderId"); // Retrieve the folder ID from localStorage

      const response = await axios.put(
        `${apiUrl}/api/forms/form/${formId}`, // PUT request to update the form by formId
        {
          folderId: folderId, // folder where formbot should be update
          name: formName, // Form name
          fields: fields, // Updated fields (contains both bubbles and inputs)
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFormName(formName);

      if (response.data.success) {
        toast.success("Form Update successfull", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  // Handle generating a shareable link
  const shareForm = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/forms/share/${fId}`,
        { fields },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      localStorage.setItem("linkId", response.data.linkId);
      const link = `http://localhost:5173/formbot/${response.data.linkId}`;
      navigator.clipboard.writeText(link);
      alert("Link copied to clipboard: " + link);
      toast.success("Form link generated!", { position: "top-center" });
    } catch (error) {
      console.error("Error sharing form:", error);
    }
  };

  // clearing formfield and navigate to formdashboard
  const handleCross = () => {
    setFields([]); // Clear form fields
    setFormName(""); // Clear form name
    localStorage.removeItem("formId"); // Optional: Clear formId from localStorage
    navigate("/folder"); // Navigate to FormDashboard
  };
  const deleteField = (index) => {
    const updatedFields = fields.filter(
      (_, fieldIndex) => fieldIndex !== index
    );
    setFields(updatedFields);
  };

  return (
    <>
      <div className={style.Workspace_Main_Container}>
        <div className={style.Workspace_Navbar}>
          <div className={style.Workspace_input}>
            <input
              type="text"
              name="name"
              placeholder="Enter Form Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>

          <div className={style.Workspace_Theme}>
            <button
              className={style.Workspace_flowbtn}
              onClick={() => setRes(true)}
            >
              Flow
            </button>
            <button
              className={style.Workspace_Responsebtn}
              onClick={() => setRes(false)}
            >
              Response
            </button>
          </div>
          <div className={style.Workspace_NavbarBtns}>
            <div className={style.dark}>
              <p>Light</p>
              <label className={style.switch}>
                <input
                  type="checkbox"
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />
                <span className={`${style.slider} ${style.round}`}></span>
              </label>
              <p>Dark</p>
            </div>
            <div className={style.Workspace_NavbarButton}>
              <button className={style.Workspace_shareBtn} onClick={shareForm}>
                Share
              </button>
              <button className={style.Workspace_saveBtn} onClick={saveForm}>
                Save
              </button>
              <button className={style.Workspace_XBtn} onClick={handleCross}>
                x
              </button>
            </div>
          </div>
        </div>

        {res ? (
          <div className={style.Workspace_content}>
            <div className={style.Workspace_Leftpanel}>
              <div className={style.sidebar}>
                <div className={style.bubble}>
                  <h3>Bubbles</h3>
                  <button onClick={() => addBubble("Text")}>
                    <i className="fa-regular fa-message"></i>Text
                  </button>
                  <button onClick={() => addBubble("Image")}>
                    <i className="fa-regular fa-image"></i>Image
                  </button>
                  <button onClick={() => addBubble("Video")}>
                    <i className="fa-solid fa-film"></i>Video
                  </button>
                  <button onClick={() => addBubble("GIF")}>
                    <i className="fa-solid fa-gif"></i>GIF
                  </button>
                </div>
                <div className={style.inputes}>
                  <h3>Input Fields</h3>
                  <button onClick={() => addInput("text")}>Text</button>
                  <button onClick={() => addInput("number")}>
                    <i className="fa-regular fa-hashtag"></i>Number
                  </button>
                  <button onClick={() => addInput("email")}>
                    <i className="fa-regular fa-at"></i>Email
                  </button>
                  <button onClick={() => addInput("number")}>
                    <i className="fa-solid fa-phone"></i>Phone
                  </button>
                  <button onClick={() => addInput("date")}>
                    <i className="fa-regular fa-calendar"></i>Date
                  </button>
                  <button onClick={() => addInput("number")}>
                    <i className="fa-regular fa-star"></i>Rating
                  </button>
                  <button onClick={() => addInput("number")}>
                    <i className="fa-regular fa-square-check"></i>Buttons
                  </button>
                </div>
              </div>
            </div>
            <div className={style.Workspace_Rightpanel}>
              <div className={style.Workspace_Rightpanel_Container}>
                <div className={style.startFlag}>
                  <h4>
                    <i className="fa-regular fa-flag"></i>Start
                  </h4>
                </div>
                {fields.map((field, index) => (
                  <div key={index} className={style.Workspace_FormField}>
                    <label>{field.label}</label>
                    {field.type === "input" ? (
                      <input
                        type={field.inputType}
                        placeholder={`Enter ${field.inputType}`}
                        value={field.value}
                        onChange={(e) =>
                          handleFieldChange(index, e.target.value)
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter bubble data"
                        value={field.value}
                        onChange={(e) =>
                          handleFieldChange(index, e.target.value)
                        }
                      />
                    )}
                    {/* Add Delete Button */}
                    <div className={style.deleteBtn}>
                      <button onClick={() => deleteField(index)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Responses forms={formResponse} />
        )}
      </div>
    </>
  );
};

export default FormWorkspace;
