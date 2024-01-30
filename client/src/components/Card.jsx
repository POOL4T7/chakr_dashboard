// 
const Card = ({ name, value, desc, link , id}) => {
    console.log('id', id)
  return (
    <div className={id=="card3"? "col-2":"col-5"}>
      <div className="content-box">
        <div className="content-titile">
          <h3>{name} </h3>
        </div>
        <div className="content-body">
          <h4>
            {value} <i className="fa fa-arrow-up"></i>
          </h4>
          <p>{desc}</p>
        </div>
        <div className="content-footer">
          <a href={link?.url}>
            {link?.text} <i className="fa fa-long-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
