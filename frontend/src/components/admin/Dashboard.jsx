import Layout from "../common/adminLayout/Layout";
import Card from "react-bootstrap/Card";

const Dashboard = () => {
  return (
    <>
      <Layout>
        {/* <h2 className="my-3">Dashboard</h2> */}

        <div className="row mt-5">
          <div className="col-md-4">
            <Card className="text-center mb-5">
              <Card.Body>
                <Card.Text>
                  <h3>Total categries :</h3>
                  <h1>56</h1>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">See All</Card.Footer>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="text-center mb-5">
              <Card.Body>
                <Card.Text>
                  <h3>Total Brands :</h3>
                  <h1>24</h1>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">See All</Card.Footer>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="text-center mb-5">
              <Card.Body>
                <Card.Text>
                  <h3>Total Products :</h3>
                  <h1>6</h1>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">See All</Card.Footer>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
