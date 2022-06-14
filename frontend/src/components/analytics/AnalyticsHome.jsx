import {routes} from "../../constants";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";

// https://www.flaticon.com/premium-icon/bar-chart_738881
// https://www.flaticon.com/premium-icon/pie-chart_2936725
// https://www.flaticon.com/premium-icon/bar-chart_1376254?related_id=1376203&origin=search
// https://www.flaticon.com/free-icon/analytics_921591
function AnalyticsHome() {

    const history = useHistory();

    function onClick() {
        console.log("cardName")
    }

    return (
        <Container fluid>
            <Row className="ms-2 me-2 ms-sm-5 me-sm-5 pt-2 pt-sm-5" style={{justifyContent: 'space-evenly'}}>
                <Card className="col-12 col-sm-4 col-md-3 mb-3" onClick={onClick} style={{cursor: "pointer"}}>
                    <Card.Img className="p-3" variant="top" src="bar-chart.png"/>
                    <Card.Body>
                        <Card.Title>Expense Tracking</Card.Title>
                    </Card.Body>
                </Card>
                <Card className="col-12 col-sm-4 col-md-3 mb-3" onClick={onClick} style={{cursor: "pointer"}}>
                    <Card.Img className="p-3" variant="top" src="analytics.png"/>
                    <Card.Body>
                        <Card.Title>Spending Trends</Card.Title>
                    </Card.Body>
                </Card>
                <Card className="col-12 col-sm-4 col-md-3" onClick={onClick} style={{cursor: "pointer"}}>
                    <Card.Img className="p-3" variant="top" src="bar-chart-two.png"/>
                    <Card.Body>
                        <Card.Title>Expense Analysis</Card.Title>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export {AnalyticsHome};