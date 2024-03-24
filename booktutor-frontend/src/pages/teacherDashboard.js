import React, { useEffect, useState } from 'react'
import Chat from './chat';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const TeacherDashboard = () => {

    const history = useHistory();
	const [subject , setSubject] = useState('');
	const token = localStorage.getItem("token" || null);
	const [tab , setTab] = useState("dashboard");
	const user = JSON.parse(localStorage.getItem("user" || null));

    const logout = () => {
		localStorage.removeItem("teachertoken");
		localStorage.removeItem("user");
		localStorage.removeItem("authuser");
		setTimeout(() => {
			history.push("/login")
		}, 1000);
    }


    useEffect(() => {
        const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
        const menuBar = document.querySelector('#content nav .bx.bx-menu');
        const sidebar = document.getElementById('sidebar');
        const searchButton = document.querySelector('#content nav form .form-input button');
        const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
        const searchForm = document.querySelector('#content nav form');
        const switchMode = document.getElementById('switch-mode');
    
        const handleSideMenuClick = (e) => {
          const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
          const li = e.target.parentElement;
    
          allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
          });
    
          li.classList.add('active');
        };
    
        const handleMenuBarClick = () => {
          sidebar.classList.toggle('hide');
        };
    
        const handleSearchButtonClick = (e) => {
          if (window.innerWidth < 576) {
            e.preventDefault();
            searchForm.classList.toggle('show');
    
            if (searchForm.classList.contains('show')) {
              searchButtonIcon.classList.replace('bx-search', 'bx-x');
            } else {
              searchButtonIcon.classList.replace('bx-x', 'bx-search');
            }
          }
        };
    
        const handleWindowResize = () => {
          if (window.innerWidth < 768) {
            sidebar.classList.add('hide');
          } else if (window.innerWidth > 576) {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
          }
        };
    
        const handleSwitchModeChange = () => {
          if (switchMode.checked) {
            document.body.classList.add('dark');
          } else {
            document.body.classList.remove('dark');
          }
        };
    
        allSideMenu.forEach(item => {
          item.addEventListener('click', handleSideMenuClick);
        });
    
        menuBar.addEventListener('click', handleMenuBarClick);
        // searchButton.addEventListener('click', handleSearchButtonClick);
        window.addEventListener('resize', handleWindowResize);
        switchMode.addEventListener('change', handleSwitchModeChange);
    
        return () => {
          allSideMenu.forEach(item => {
            item.removeEventListener('click', handleSideMenuClick);
          });
    
          menuBar.removeEventListener('click', handleMenuBarClick);
        //   searchButton.removeEventListener('click', handleSearchButtonClick);
          window.removeEventListener('resize', handleWindowResize);
          switchMode.removeEventListener('change', handleSwitchModeChange);
        };
      }, []);

  return (
    <div>
	<section id="sidebar">
		<a href="#" class="brand">
			<i class='bx bxs-smile'></i>
			<span class="text">TutorFinder</span>
		</a>
		<ul class="side-menu top">
			<li class="active" onClick={() => setTab("dashboard")}>
				<a href="#">
					<i class='bx bxs-dashboard' ></i>
					<span class="text">Dashboard</span>
				</a>
			</li>
			<li>
				<a href="#" onClick={() => setTab("messages")}>
					<i class='bx bxs-message-dots' ></i>
					<span class="text">Message</span>
				</a>
			</li>
			<li>
				<a href="#" onClick={() => setTab("profile")}>
					<i class='bx bxs-doughnut-chart' ></i>
					<span class="text">View Pofile</span>
				</a>
			</li>
			<li>
				<a href="#" onClick={logout}>
					<i class='bx bxs-log-out-circle' ></i>
					<span class="text">Logout</span>
				</a>
			</li>
			
		</ul>
		

	</section>



	<section id="content">
		<nav>
			<i class='bx bx-menu fs-1' ></i>
		{/* { tab === "dashboard" && <a href="#" class="nav-link">Categories</a> } */}
			{ tab === "ABC" &&
             <form action="#" >
				<div class="form-input">
					<div class="select-box">
              <select name='subject' value={subject} onChange={(e) => setSubject(e.target.value)} className='fs-5'>
                <option hidden>Select Subject </option>
                <option value={""}>All</option>
                <option>English</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>Social Studies</option>
                <option>History</option>
                <option>Geography</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
                 <option>Environmental Science</option> 
                 <option>Physical Education</option> 
                 <option>Health Education</option>

                <option>Foreign Languages (e.g., Spanish, French, German )</option>
                <option>Computer Science - Information Technology</option>
                <option>Business Studies</option>
                <option>Home Economics</option>
                <option>Philosophy</option> 
                <option>Psychology</option> 
                <option>Sociology</option>

              </select>
            </div>
					<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
				</div>
			</form>
            }
			<div className="d-flex justify-content-end w-100 gap-4 align-items-center">
				<>
				<input type="checkbox" id="switch-mode" hidden/>
			<label for="switch-mode" class="switch-mode"></label>
			<a href="#" class="notification">
				<i class='bx bxs-bell' ></i>
				<span class="num">8</span>
			</a>
			<a href="#" class="profile">
				<img src={`http://localhost:9000/${user?.image}`}/>
			</a>
				</>
			</div>
			
		</nav>

		{ tab === "dashboard" && <main>
			<div class="head-title">
				<div class="left">
					<h1>Dashboard</h1>
					 <ul class="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i class='bx bx-chevron-right' ></i></li>
						<li>
							<a class="active" href="#">Home</a>
						</li>
					</ul> 
				</div>
			    <a href="#" class="btn-download">
					<i class='bx bxs-cloud-download' ></i>
					<span class="text">Download PDF</span>
				</a> 
			</div>

			<ul class="box-info">
				<li>
					<i class='bx bxs-calendar-check' ></i>
					<span class="text">
						<h3>3</h3>
						<p>All Teachers</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-group' ></i>
					<span class="text">
						<h3>2834</h3>
						<p>Visitors</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-dollar-circle' ></i>
					<span class="text">
						<h3>$2543</h3>
						<p>Total Sales</p>
					</span>
				</li>
			</ul> 


			 
		</main>}
		{ tab === "messages" && <Chat/> }
	</section>
    </div>
  )
}

export default TeacherDashboard
