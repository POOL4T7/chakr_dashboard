const CustomerCard = ({ name, company, imageUrl }) => {
  return (
    <li>
      <div className="customer-box">
        <div className="customer-img">
          <img src={imageUrl} alt="" />
        </div>
        <div className="customer-content">
          <h5>{name}</h5>
          <span>{company}</span>
        </div>
      </div>
      <div className="customer-box-right">
        <ul>
          <li>
            <a href="#">
              <i className="fa fa-comment-o" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-star-o" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default CustomerCard;
