import React, { useEffect, useState } from "react";
import style from "./folderDashboard.module.css";
import { toast } from "react-toastify";
import { useTheme } from "../DarkNLight";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FolderDashboard = () => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [bool3, setBool3] = useState(false);
  const [bool4, setBool4] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [ind, setInd] = useState(null);
  const [name, setName] = useState("");
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [fId, setFolderId] = useState(null);
  const [formid, setFormid] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [accessType, setAccessType] = useState("edit");

  let { folderId, formId } = useParams();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/getUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const user = response.data.user;
      setName(user.userName);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/folders/folders/:id`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFolders(response.data.output);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
    fetchUser();
  }, []);

  // Creating a folder
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!folderName) return;

    try {
      const response = await axios.post(
        `${apiUrl}/api/folders/create-folder`,
        { name: folderName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFolders([...folders, response.data]);
      fetchFolders();
      setFolderName("");
    } catch (error) {
      console.error("Error creating folder:", error);
    }
    setBool2(!bool2);
  };

  const handleFolderName = (e) => {
    setFolderName(e.target.value);
  };

  const handleConfirm = (index) => {
    setFolderId(index);
    setInd(index);
    setBool3(!bool3);
  };

  const handleFormConfirm = (index) => {
    setFormid(index);
    setInd(index);
    setBool4(!bool4);
  };

  // Deleting a folder
  const handleDeleteFolder = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${apiUrl}/api/folders/folder/${fId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // Remove deleted folder from the list
      setFolders(folders.filter((folder) => folder._id !== fId));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
    toast.success("Folder Delete successful", { position: "top-right" });
    setBool3(!bool3);
  };

  const handleCreateCancel = (e) => {
    e.preventDefault();
    setInd(null);
    setBool2(!bool2);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setInd(null);
    setBool3(!bool3);
  };

  const handleFormCancel = (e) => {
    e.preventDefault();
    setInd(null);
    setBool4(!bool4);
  };

  const handleFormId = (formId) => {
    navigate(`/form/${fId}/${formId}`);
  };

  const handleFormCreate = async () => {
    navigate(`/form/${fId}/${formId}`);
  };

  // Get forms from specific folder
  const handlegetForms = async (id) => {
    setFolderId(id);
    try {
      const response = await axios.get(`${apiUrl}/api/forms/${id}/forms`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setForms(response.data.forms);
      if (response.data.forms.length > 0) {
        localStorage.setItem("formId", response.data.forms[0]._id);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  // Deleting a form
  const handleDeleteForm = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${apiUrl}/api/forms/form/${formId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // Remove deleted form from the list
      setForms(forms.filter((form) => form._id !== formId));
    } catch (error) {
      console.error("Error deleting form:", error);
    }
    toast.success("Form Delete successful", { position: "top-right" });
    setBool4(!bool4);
  };

  const handleSetting = (e) => {
    const option = e.target.value;
    if (option === "settings") {
      navigate(`/${option}`);
    } else {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successful", {
      position: "top-right",
    });
  };

  const handleShareSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/check-email`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const userExists = response.data.exists;

      if (userExists) {
        // Send invite to registered user
        await axios.post(
          `${apiUrl}/api/invite/send`,
          { email, accessType },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Invitation sent successfully!", {
          position: "top-right",
        });
      } else {
        // Generate and copy link for unregistered user
        const linkResponse = await axios.post(
          `${apiUrl}/api/invite/generate-link`,
          { email, accessType },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const link = linkResponse.data.link;

        // Copy to clipboard
        navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard!", {
          position: "top-right",
        });
      }

      // Reset form
      setEmail("");
      setBool(false);
    } catch (error) {
      console.error("Error sharing folder:", error);
      toast.error("Failed to share the folder", {
        position: "top-right",
      });
    }
  };

  return (
    <div className={style.FormDashboard}>
      <div className={style.navbar}>
        <div className={style.nav}>
          <div className={style.workName}>
            <select
              name="workspaceName"
              id="workspaceName"
              onChange={handleSetting}
            >
              <option value="">{name}'s worksapce</option>
              <option value="settings">Settings</option>
              <option value="logout" className={style.logout}>
                Logout
              </option>
            </select>
          </div>
          <div className={style.navend}>
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
            <button onClick={() => setBool(true)}>share</button>
          </div>
        </div>
      </div>
      <hr />
      <div className={style.container}>
        <div className={style.createBot}>
          <div className={style.createFolder}>
            <div className={style.createFolderBtn}>
              <button className={style.newBtn} onClick={() => setBool2(!bool2)}>
                <i className="fa-solid fa-folder-plus"></i>Create a folder
              </button>

              {folders.map((item, index) => (
                <button
                  className={style.fName}
                  key={index}
                  onClick={() => handlegetForms(item._id)}
                >
                  {item.name}
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => handleConfirm(item._id)}
                  ></i>
                </button>
              ))}
            </div>

            <div className={style.createTypeBot}>
              <button className={style.createBotBtn} onClick={handleFormCreate}>
                <p className={style.plus}>+</p>
                <p className={style.plusText}>Create a typebot</p>
              </button>
              {forms.map((item, index) => (
                <button
                  className={style.createFormBtn}
                  key={index}
                  onClick={() => handleFormId(item._id)}
                >
                  {item.name}
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={(e) => {
                      handleFormConfirm(item._id);
                      e.stopPropagation();
                    }}
                  ></i>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* modal 1 */}
        {bool && (
          <div
            className={style.shareModal}
            onClick={() => {
              setBool(false);
            }}
          >
            <div className={style.modal}>
              <form
                className={style.shareForm}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleShareSubmit}
              >
                <div className={style.exitForm}>
                  <button
                    onClick={() => {
                      setBool(false);
                    }}
                  >
                    x
                  </button>
                </div>
                <div className={style.email}>
                  <div className={style.shareText}>Invite by Email</div>
                  <div className={style.editText}>
                    <select
                      name="accessType"
                      value={accessType}
                      onChange={(e) => setAccessType(e.target.value)}
                    >
                      <option value="edit">edit</option>
                      <option value="view">view</option>
                    </select>
                  </div>
                </div>
                <input
                  className={style.inputShare}
                  type="email"
                  required
                  placeholder="Enter email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className={style.sendBtn}>
                  Send Invite
                </button>
                <label htmlFor="">
                  <div className={style.shareText}>Invite by Link</div>
                </label>
                <button type="submit" className={style.sendBtn}>
                  Copy Link
                </button>
              </form>
            </div>
          </div>
        )}
        {/* modal 2 */}
        {bool2 && (
          <div
            className={style.shareModal}
            onClick={() => {
              setBool2(false);
            }}
          >
            <div className={style.modalTwo}>
              <form
                className={style.createFolderForm}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleCreateFolder}
              >
                <div className="createFolderName">
                  <label htmlFor="">Create New Folder</label>
                </div>
                <input
                  type="text"
                  className={style.inputShare}
                  value={folderName}
                  onChange={handleFolderName}
                  placeholder="Enter folder name"
                />
                <div className={style.buttons}>
                  <button type="submit" className={style.doneBtn}>
                    Done
                  </button>
                  <div className={style.div}>|</div>
                  <button
                    className={style.cancelBtn}
                    onClick={handleCreateCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* modal 3 */}
        {bool3 && (
          <div
            className={style.shareModal}
            onClick={() => {
              setBool3(false);
            }}
          >
            <div className={style.modalTwo}>
              <form
                className={style.createFolderForm}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={style.createFolderName}>
                  <label htmlFor="">
                    Are you sure you want to delete this folder ?
                  </label>
                </div>
                <div className={style.buttons}>
                  <button
                    className={style.doneBtn}
                    onClick={handleDeleteFolder}
                  >
                    Confirm
                  </button>
                  <div className={style.div}>|</div>
                  <button className={style.cancelBtn} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {bool4 && (
          <div
            className={style.shareModal}
            onClick={() => {
              setBool4(false);
            }}
          >
            <div className={style.modalTwo}>
              <form
                className={style.createFolderForm}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={style.createFolderName}>
                  <label htmlFor="">
                    Are you sure you want to delete this Form ?
                  </label>
                </div>
                <div className={style.buttons}>
                  <button className={style.doneBtn} onClick={handleDeleteForm}>
                    Confirm
                  </button>
                  <div className={style.div}>|</div>
                  <button
                    className={style.cancelBtn}
                    onClick={handleFormCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderDashboard;
