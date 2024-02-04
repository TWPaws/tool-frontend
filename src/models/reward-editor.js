import { Component } from "react";
import { Form, Modal, Row, Col, InputGroup, Button } from "react-bootstrap";

export class RewardEditor extends Component {
    state = {
        modalTitle: "",
        isMaxPerStreamEnabled: false,
        isMaxPerUserPerStreamEnabled: false,
        isGlobalCooldownEnabled: false,
        isSubmitting: false
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({isSubmitting: true});
        var requestBody = this.packRequestBody(e.target);
        requestBody.access_token = this.props.access_token;
        requestBody.broadcaster_id = this.props.broadcaster_id;
        fetch(this.props.submitTarget, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)})
        .then(res => res.json())
        .then(data => {
            this.props.submitRefresh();
            this.setState({isSubmitting: false});
        })
        .catch(e => console.log(e));
    }

    packRequestBody = (data) => {
        var globalCooldownSeconds = data.globalCooldown.value * data.globalCooldownUnit.value;

        return {
            title: data.rewardName.value,
            cost: Number(data.rewardCost.value),
            prompt: data.rewardPrompt.value,
            background_color: data.backgroundColor.value,
            is_user_input_required: data.isUserInputRequired.checked,
            is_max_per_stream_enabled: data.isMaxPerStreamEnabled.checked,
            max_per_stream: Number(data.maxPerStream.value),
            is_max_per_user_per_stream_enabled: data.isMaxPerUserPerStreamEnabled.checked,
            max_per_user_per_stream: Number(data.maxPerUserPerStream.value),
            is_global_cooldown_enabled: data.isGlobalCooldownEnabled.checked,
            global_cooldown_seconds: globalCooldownSeconds
        }
    }
    
    handleMaxPerStream = (e) => {
        this.setState({isMaxPerStreamEnabled: e.target.checked});
    }

    handleMaxPerUserPerStream = (e) => {
        this.setState({isMaxPerUserPerStreamEnabled: e.target.checked});
    }

    handleGlobalCooldown = (e) => {
        this.setState({isGlobalCooldownEnabled: e.target.checked});
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitForm} id="rewardForm">
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="rewardName">
                                <Form.Label>獎勵名稱</Form.Label>
                                <Form.Control type="text" placeholder="為獎勵命名"></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="rewardCost">
                                <Form.Label>點數</Form.Label>
                                <Form.Control type="number" placeholder="輸入數量"></Form.Control>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="rewardPrompt">
                                <Form.Label>說明</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="簡單介紹您希望觀眾要求的內容"></Form.Control>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="backgroundColor">
                                <Form.Label>背景顏色</Form.Label>
                                <Form.Control type="color"></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="isUserInputRequired">
                                <Form.Label>要求觀眾輸入文字</Form.Label>
                                <Form.Check type="switch"></Form.Check>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="maxPerStream">
                                <Form.Label>每場實況的兌換額度</Form.Label>
                                <InputGroup>
                                    <InputGroup.Checkbox id="isMaxPerStreamEnabled" onChange={this.handleMaxPerStream} />
                                    <Form.Control type="number" placeholder="輸入數量" disabled={!this.state.isMaxPerStreamEnabled}></Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} controlId="maxPerUserPerStream">
                                <Form.Label>每位使用者每場實況的額度</Form.Label>
                                <InputGroup>
                                    <InputGroup.Checkbox id="isMaxPerUserPerStreamEnabled" onChange={this.handleMaxPerUserPerStream} />
                                    <Form.Control type="number" placeholder="輸入數量" disabled={!this.state.isMaxPerUserPerStreamEnabled}></Form.Control>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="globalCooldown">
                                <Form.Label>兌換冷卻時間 (最長7天)</Form.Label>
                                <InputGroup>
                                    <InputGroup.Checkbox id="isGlobalCooldownEnabled" onChange={this.handleGlobalCooldown} />
                                    <Form.Control type="number" placeholder="輸入數字" disabled={!this.state.isGlobalCooldownEnabled}></Form.Control>
                                    <Form.Select id="globalCooldownUnit">
                                        <option value="1">秒</option>
                                        <option value="60">分</option>
                                        <option value="3600">小時</option>
                                        <option value="86400">天</option>
                                    </Form.Select>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.hide}>取消</Button>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        form="rewardForm"
                        disabled={this.state.isSubmitting}
                    >
                        {this.state.isSubmitting ? "處理中..." : "送出"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}