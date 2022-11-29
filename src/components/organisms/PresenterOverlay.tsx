import { Button, Col, Container, Row } from "reactstrap";

const PresenterOverlay = () => (
    <div id="buttons"
        className='fixed-bottom w-100 h-20 mb-5'>
        <Container className="container-fluid">
            <Row>
                <Col xs={4} className="d-flex align-items-center justify-content-center">
                    <Button size={"lg"}>
                        Start
                    </Button>
                </Col>
                <Col xs={4} className="d-flex align-items-center justify-content-center">
                    <Button size={"lg"}>
                        Screens
                    </Button>
                </Col>
                <Col xs={4} className="d-flex align-items-center justify-content-center">
                    <Button size={"lg"}>
                        Windows
                    </Button>
                </Col>

            </Row>
        </Container>
    </div>
)
export default PresenterOverlay;