import React, { Component } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { REACT_APP_DASHBOARD_URL } from "../constants"
import { fetchOrgName } from "../../api/organization";

class Navigationbar extends Component {
    constructor() {
        super()

        this.state = {
            org_id: null,
            org_name: ""
        }
    }

    async componentDidMount() {
        // fetch organization info using preset REACT_APP_ORGANIZATION_ID const
        await fetchOrgName().then((orgDetails) => {
            this.setState({
                org_id: orgDetails.id,
                org_name: orgDetails.name,
            });
        });
    }

    render() {
        return (

            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">
                        {this.state.org_name}
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/roster">Roster</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a href={REACT_APP_DASHBOARD_URL} target="_blank" rel="noreferrer">Login</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

}

export default Navigationbar;