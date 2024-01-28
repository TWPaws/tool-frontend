import { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export class ClaimerList extends Component {
    render() {
        var claimerList = this.props.claimers.map(claimer => {
            return (
                <ListGroupItem key={crypto.randomUUID()}>{claimer.broadcaster_name}({claimer.broadcaster_login})</ListGroupItem>
            );
        })

        if (claimerList && claimerList.length === 0) {
            claimerList = (<ListGroupItem key={crypto.randomUUID()}>(空)</ListGroupItem>);
        }

        return (
            <ListGroup>
                {claimerList}
            </ListGroup>
        );
    }
}