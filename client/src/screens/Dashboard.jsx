import { useEffect, useState } from "react";
import Card from "../components/Card";
import GrowthChart from "../components/Chart";
import CustomerCard from "../components/CustomerCard";
import Sidebar from "../components/Sidebar";
import { Customers, cardList } from "../utils/data";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  const onchnageTimeStamp = async (e) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/growth?q=${e.target.value}`
      );
      const downsampledData = await response.json();
      setChartData(downsampledData.data?.growth || []);
    } catch (e) {
      console.log("e.message", e.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/growth?q=all`);
        const downsampledData = await response.json();
        setChartData(downsampledData.data?.growth || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <div className="main-content">
              <div className="main-content-row">
                <div className="row custom-row">
                  {cardList?.map((card) => (
                    <Card
                      key={card.id}
                      name={card.name}
                      value={card.value}
                      desc={card.desc}
                      link={card.link}
                      id={card.id}
                    />
                  ))}
                </div>
                <div className="row">
                  <div className="col-6 customer-card">
                    <div className="content-box content-box-space">
                      <div className="content-header">
                        <div className="content-titile">
                          <h3>Customers </h3>
                        </div>
                        <div className="content-right">
                          <select>
                            <option>Sort by Newest</option>
                            <option>Sort by Old</option>
                            <option>Sort by Richest</option>
                          </select>
                        </div>
                      </div>

                      <div className="content-body">
                        <ul>
                          {Customers?.map((customer) => (
                            <CustomerCard
                              key={customer.id}
                              name={customer.name}
                              company={customer.company}
                              imageUrl={customer.imageUrl}
                            />
                          ))}
                        </ul>
                      </div>
                      <div className="content-footer">
                        <a href="#">
                          Revenues report{" "}
                          <i className="fa fa-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="content-box  content-box-space">
                      <div className="content-header">
                        <div className="content-titile">
                          <h3>Growth</h3>
                        </div>
                        <div className="content-right">
                          <select
                            onChange={onchnageTimeStamp}
                          >
                            <option value="all">Yearly</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                          </select>
                        </div>
                      </div>
                      <div className="content-body">
                        <GrowthChart data={chartData} />
                      </div>
                    </div>
                    <div className="row content-box2">
                      <div className="col-4">
                        <div className="content-box-card">
                          <div className="content-box-card-title content-box-card-space">
                            <h6>Top month</h6>
                          </div>
                          <div className="content-box-card-content">
                            <p>November</p>
                            <span>2019</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="content-box-card">
                          <div className="content-box-card-title content-box-card-space">
                            <h6>Top year</h6>
                          </div>
                          <div className="content-box-card-content">
                            <p>2023</p>
                            <span className="color-font">96K sold so far</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="content-box-card">
                          <div className="content-box-card-title">
                            <h6>Top buyer</h6>
                          </div>
                          <div className="content-box-card-content1">
                            <img src="image/Avatar.png" />
                            <p>Maggie Johnson</p>
                            <span className="color-font">
                              Oasis Organic Inc.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
