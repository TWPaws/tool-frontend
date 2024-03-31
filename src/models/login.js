import { Component } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export class LoginModal extends Component {
    URL_PREFIX = 'https://www.twpaws.live/api'
    state = {
        showModal: false,
        isLoggingin: false
    }

    handleClose = () => this.setState({showModal: false})
    handleShow = () => this.setState({showModal: true})

    handleLogin = (e) => {
        e.preventDefault();
        this.setState({isLoggingin: true});
        var requestBody = this.packLoginRequestBody(e.target);
        fetch(this.URL_PREFIX.concat('/user/login'), {
            method: "POST",
            body: requestBody
        })
        .then((res) => res.json())
        .then(data => {
            this.setState({isLoggingin: false});
            this.handleClose();
        })
        .then(() => {
            fetch(this.URL_PREFIX.concat('/user/status'), {method: "GET"})
            .then((res) => {
                var loginInfo = {};
                if (res.status === 200) {
                    loginInfo = {nickname: res.json().nickname, connectedToTwitch: true};
                }
                else if (res.status === 404) {
                    loginInfo = {nickname: res.json().nickname, connectedToTwitch: false};
                }
                else {
                    loginInfo = {nickname: null, connectedToTwitch: false};
                }
                return this.props.passLoginInfo(loginInfo);
            })
        })
        .catch(e => console.log(e));
    }

    packLoginRequestBody = (data) => {
        var formData = new FormData();
        formData.append("username", data.username.value);
        formData.append("password", data.password.value);
        return formData;
    }

    render() {
        return (
            <>
            <Button variant="primary" onClick={this.handleShow}>
                Login
            </Button>
            <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>登入</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleLogin} id="loginForm">
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="username">
                                <Form.Label>使用者名稱</Form.Label>
                                <Form.Control type="text" placeholder="使用者名稱"></Form.Control>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="password">
                                <Form.Label>密碼</Form.Label>
                                <Form.Control type="password" placeholder="密碼"></Form.Control>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        取消
                    </Button>
                    <Button 
                        variant="primary"
                        type="submit"
                        form="loginForm"
                        disabled={this.state.isLoggingin}
                    >
                        {this.state.isLoggingin ? "登入中..." : "登入"}
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}