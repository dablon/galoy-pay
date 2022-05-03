import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Jumbotron from "react-bootstrap/Jumbotron"
import { gql, useQuery } from "@apollo/client"
import getConfig from "next/config"

const GET_NODE_STATS = gql`
  query nodeIds {
    globals {
      nodesIds
    }
  }
`

const { publicRuntimeConfig } = getConfig()

function Home() {
  const nodeUrl =
    publicRuntimeConfig.graphqlUri.indexOf("staging") === -1
      ? `https://1ml.com/node/`
      : `https://1ml.com/testnet/node/`

  const { loading, error, data } = useQuery(GET_NODE_STATS)

  return (
    <Container>
      <br />
      <Row>
        <Col>
          <h2>Connect to the {publicRuntimeConfig.appName} Lightning Node</h2>
          <br />
          <Jumbotron>
            <Container>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <label>Node Public Key: </label>{" "}
                          <p style={{ fontSize: "small", overflowWrap: "break-word" }}>
                            {error
                              ? "Unavailable"
                              : loading
                              ? "Loading..."
                              : data.globals.nodesIds[0]}
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          {error ? (
                            "Unavailable"
                          ) : loading ? (
                            "Loading..."
                          ) : (
                            <a
                              target="_blank"
                              href={nodeUrl + `${data.globals.nodesIds[0]}`}
                            >
                              Connect to the {publicRuntimeConfig.appName} Lightning node
                            </a>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <hr />
            </Container>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}

export default Home