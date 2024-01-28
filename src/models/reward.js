import { Component } from "react";
import { Accordion, Button } from "react-bootstrap";
import { ClaimerList } from "./claimer-list";

export class Reward extends Component {
    copyTextToClipboard = () => {
        var targetText = this.props.claimers.map(claimer => `${claimer.broadcaster_name}(${claimer.broadcaster_login})`);
        navigator.clipboard.writeText(targetText.join("\n"));
    }

    render() {
        return (
            <Accordion.Item eventKey={this.props.id}>
                <Accordion.Header>{this.props.title}</Accordion.Header>
                <Accordion.Body>
                    <h4 className="text-center">兌換清單</h4>
                    <ClaimerList claimers={this.props.claimers} />
                    <Button style={{margin: "10px"}} onClick={this.copyTextToClipboard}>複製清單</Button>
                </Accordion.Body>
            </Accordion.Item>
        );
    }
}