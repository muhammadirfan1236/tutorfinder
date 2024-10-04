import React, { useEffect, useState } from "react";
import Chat from "./chat";
import "../statics/css/dashboard.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import DeleteModal from "../modals/deelteModal";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token" || null);
  const [tab, setTab] = useState("students");
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user" || null));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    localStorage.removeItem("admintoken");
    localStorage.removeItem("user");
    localStorage.removeItem("authuser");
    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };

  const teachersData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/teachers/all`)
      .then((res) => {
        console.log("abc", res);
        setTeachers(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const studetnsData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/students/allStudents`)
      .then((res) => {
        console.log("abc", res);
        setStudents(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    teachersData();
    studetnsData();
  }, []);

  const [studentToggle, setStudentToggle] = useState(false);
  const [studentId, setStudentId] = useState();
  const [teacherToggle, setTeacherToggle] = useState(false);
  const [teacherId, setTeacherId] = useState();

  console.log("studentId", studentId);

  useEffect(() => {
    const allSideMenu = document.querySelectorAll(
      "#sidebar .side-menu.top li a"
    );
    const menuBar = document.querySelector("#content nav .bx.bx-menu");
    const sidebar = document.getElementById("sidebar");
    const searchButton = document.querySelector(
      "#content nav form .form-input button"
    );
    // const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector("#content nav form");
    const switchMode = document.getElementById("switch-mode");

    const handleSideMenuClick = (e) => {
      const allSideMenu = document.querySelectorAll(
        "#sidebar .side-menu.top li a"
      );
      const li = e.target.parentElement;

      allSideMenu.forEach((i) => {
        i.parentElement.classList.remove("active");
      });

      li.classList.add("active");
    };

    const handleMenuBarClick = () => {
      sidebar.classList.toggle("hide");
    };

    const handleSearchButtonClick = (e) => {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");

        if (searchForm.classList.contains("show")) {
          // searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
          // searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
      }
    };

    const handleWindowResize = () => {
      if (window.innerWidth < 768) {
        sidebar.classList.add("hide");
      } else if (window.innerWidth > 576) {
        // searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove("show");
      }
    };

    const handleSwitchModeChange = () => {
      if (switchMode.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    };

    allSideMenu.forEach((item) => {
      item.addEventListener("click", handleSideMenuClick);
    });

    menuBar.addEventListener("click", handleMenuBarClick);
    // searchButton.addEventListener('click', handleSearchButtonClick);
    window.addEventListener("resize", handleWindowResize);
    switchMode.addEventListener("change", handleSwitchModeChange);

    return () => {
      allSideMenu.forEach((item) => {
        item.removeEventListener("click", handleSideMenuClick);
      });

      menuBar.removeEventListener("click", handleMenuBarClick);
      //   searchButton.removeEventListener('click', handleSearchButtonClick);
      window.removeEventListener("resize", handleWindowResize);
      switchMode.removeEventListener("change", handleSwitchModeChange);
    };
  }, []);

  const handleDeleteStudent = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/students/deleteStudent/${studentId}`
      );
      console.log(response.data); // Handle success message or data
      //   onDelete(); // Call the callback function to handle any necessary UI updates
      toast.success("Student Deleted Successfully");
      studetnsData();
      setStudentToggle(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error
    }
  };

  const handleDeleteTeacher = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/teachers/deleteTeacher/${teacherId}`
      );
      console.log(response.data); // Handle success message or data
      //   onDelete(); // Call the callback function to handle any necessary UI updates
      toast.success("Teacher Deleted Successfully");
      teachersData();
      setTeacherToggle(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error
    }
  };

  console.log("students", students);

  useEffect(() => {
    if (tab === "students") {
      setTeacherToggle(false);
    }
    if (tab === "teachers") {
      setStudentToggle(false);
    }
  }, [tab]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <section id="sidebar">
          <a href="#" class="brand">
            <i class="bx bxs-smile"></i>
            <span class="text">TutorFinder A</span>
          </a>
          <ul class="side-menu top">
            <li class="active" onClick={() => setTab("students")}>
              <a href="#">
                <i class="bx bxs-dashboard"></i>
                <span class="text">Students</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setTab("teachers")}>
                <i class="bx bxs-message-dots"></i>
                <span class="text">Teachers</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={logout}>
                <i class="bx bxs-log-out-circle"></i>
                <span class="text">Logout</span>
              </a>
            </li>
          </ul>
        </section>

        <section id="content">
          <nav>
            <i class="bx bx-menu fs-1"></i>
            {/* { tab === "dashboard" && <a href="#" class="nav-link">Categories</a> } */}

            <div className="d-flex justify-content-end w-100 gap-4 align-items-center">
              <>
                <input type="checkbox" id="switch-mode" hidden />
                <label for="switch-mode" class="switch-mode"></label>
                <a href="#" class="notification">
                  <i class="bx bxs-bell"></i>
                  <span class="num">8</span>
                </a>
                <a href="#" class="profile">
                  <img src={user?.image} />
                </a>
              </>
            </div>
          </nav>

          {tab === "students" && (
            <div class="table-data">
              <div class="order container">
                <div class="head">
                  <h3 className="fs-1 p-4">All Students</h3>
                  {studentToggle && (
                    <div className="d-flex gap-2 align-items-center">
                      <h5 className="mb-0">
                        Are you sure you want to delete this student
                      </h5>
                      <button
                        className="btn btn-primary"
                        onClick={handleDeleteStudent}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setStudentToggle(false)}
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
                <table class="table table-responsive">
                  <thead class="thead-dark fs-4">
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Age</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="fs-4">
                    {students?.map((item, index) => (
                      <tr>
                        <td className="d-flex gap-3 align-items-center">
                          <img
                            src={item?.image}
                            alt=""
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "8px",
                            }}
                          />
                          <p>{item.name}</p>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>
                        <td>
                          <button
                            className="btn btn-danger fs-4"
                            onClick={() => {
                              setStudentToggle(!studentToggle);
                              setStudentId(item._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === "teachers" && (
            <div class="table-data">
              <div class="order container">
                <div class="head">
                  <h3 className="fs-1 p-4">All Teachers</h3>
                  {teacherToggle && (
                    <div className="d-flex gap-2 align-items-center">
                      <h5 className="mb-0">
                        Are you sure you want to delete this teacher
                      </h5>
                      <button
                        className="btn btn-primary"
                        onClick={handleDeleteTeacher}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setTeacherToggle(false)}
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
                <table class="table table-responsive">
                  <thead class="thead-dark fs-4">
                    <tr>
                      <th>User</th>
                      <th>Subject</th>
                      <th>Email</th>
                      <th>Price</th>
                      <th>Education</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="fs-4">
                    {teachers?.map((item, index) => (
                      <tr>
                        <td className="d-flex gap-3 align-items-center">
                          <img
                            src={item?.image}
                            alt=""
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "8px",
                            }}
                          />
                          <p>{item.name}</p>
                        </td>
                        <td className="w-25">{item.subject}</td>
                        <td>{item.email}</td>
                        <td>{item.price}</td>
                        <td>{item.education}</td>
                        <td>
                          <button
                            className="btn btn-danger fs-4"
                            onClick={() => {
                              setTeacherToggle(!teacherToggle);
                              setTeacherId(item._id);
                            }}
                          >
                            {" "}
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
