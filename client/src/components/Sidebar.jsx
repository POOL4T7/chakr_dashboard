import logo from "../assets/logo.png";

const Sidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="logo-section">
        <div className="logo">
          <img src={logo} />
        </div>
      </div>
      <div className="vertical-menu">
        <div className="serach">
          <input type="text" placeholder="Serach" />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <nav className="animated bounceInDown">
          <ul>
            <li>
              <a href="#">
                <i className=""></i>
                <div className=" menu-icon"></div>
                Dashboard
              </a>
            </li>
            <li className="sub-menu">
              <a href="#settings">
                <div className="menu-icon"> </div>
                Customers
                <div className="fa fa-caret-down sub-icon"></div>
              </a>
              <ul>
                <li>
                  <a href="#">Customers 1</a>
                </li>
                <li>
                  <a href="#">Customers 2</a>
                </li>
                <li>
                  <a href="#">Customers 3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">
                <div className="  menu-icon"> </div>
                All reports
              </a>
            </li>
            <li>
              <a href="#">
                <div className="  menu-icon"> </div>
                Geography
              </a>
            </li>
            <li>
              <a href="#">
                <div className="  menu-icon"> </div>
                Conversations
              </a>
            </li>
            <li>
              <a href="#">
                <div className="  menu-icon"> </div>
                Deals
              </a>
            </li>
            <li>
              <a href="#">
                <div className="  menu-icon"> </div>
                Export
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <div className="profile-box">
          <div className="pro-img">
            <img src="image/Avatar.png" alt="" />
          </div>
          <div className="pro-content">
            <h4>Gustavo Xavier</h4>
            <span>Admin</span>
          </div>
        </div>

        <div className="pro-menu">
          <ul>
            <li>
              <a href="#">
                <div className="fa fa-cog right menu-icon"></div>
                Settings
              </a>
            </li>
            <li>
              <a href="#">
                <div className="fa fa-sign-out right menu-icon"></div>
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;