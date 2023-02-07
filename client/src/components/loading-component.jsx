import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

const LoadingComponent = () => (
    <Container fluid={true}>
        <Row className="justify-content-center align-items-center">
            <Spinner className="ss-loading" animation="border" variant="dark" />
        </Row>
    </Container>
);

export default LoadingComponent;
