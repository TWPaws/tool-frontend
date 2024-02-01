import { Component } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import { ClaimerList } from "./claimer-list";

export class Reward extends Component {
    state = {
        showConfirmModal: false,
        isDeleting: false
    }

    copyTextToClipboard = () => {
        var targetText = this.props.claimers.map(claimer => `${claimer.broadcaster_name}(${claimer.broadcaster_login})`);
        navigator.clipboard.writeText(targetText.join("\n"));
    }

    handleDelete = () => {
        this.props.deleteReward(this.props.id);
        this.setState({isDeleting: true});
    }

    showConfirmModal = () => {
        this.setState({showConfirmModal: true});
    }

    hideConfirmModal = () => {
        this.setState({showConfirmModal: false});
    }

    render() {
        return (
            <Accordion.Item eventKey={this.props.id}>
                <Accordion.Header>{this.props.title}</Accordion.Header>
                <Accordion.Body>
                    <h4 className="text-center">兌換清單</h4>
                    <ClaimerList claimers={this.props.claimers} />
                    <Button style={{margin: "10px"}} onClick={this.copyTextToClipboard}>複製清單</Button>
                    <Button variant="danger" onClick={this.showConfirmModal}>刪除獎勵</Button>
                    <Modal show={this.state.showConfirmModal} onHide={this.hideConfirmModal}>
                        <Modal.Header>
                            <Modal.Title>確定刪除獎勵？</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>確定要刪除獎勵嗎？</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.hideConfirmModal}>取消</Button>
                            <Button 
                                variant="danger" 
                                onClick={!this.state.isDeleting ? this.handleDelete : null}
                                disabled={this.state.isDeleting}
                            >
                                {this.state.isDeleting ? "刪除中..." : "刪除"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Accordion.Body>
            </Accordion.Item>
        );
    }
}