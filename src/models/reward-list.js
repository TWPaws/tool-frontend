import { Component } from "react";
import { Accordion, Stack, Button, Alert } from "react-bootstrap";
import { Reward } from './reward';

const access_token = encodeURIComponent('zzphl0ev6dtb1v9heg7s9rpngvgh69');
const rewards = [
    {title: "抽獎A", claimers: ["1", "2", "3"], id: 1},
    {title: "抽獎B", claimers: ["4", "5", "6"], id: 2}
]

export class RewardList extends Component {
    //URL_PREFIX = 'https://dev.twpaws.live';
    URL_PREFIX = 'http://127.0.0.1:5000';
    state = {
        rewards: [],
        broadcasterId: '',
        rewardItems: [],
        showAlert: false
    }

    getRewardListData = () => {
        fetch(this.URL_PREFIX.concat(`/redemption/rewards?access_token=${access_token}&broadID=${this.state.broadcasterId}`), {method: "GET"})
        .then(res => res.json())
        .then(data => {
            this.setState({rewards: data.data})
            return data.data;
        })
        .then(async data => {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                var claimers = await this.getRewardRedemptionListData(element.id);
                element['claimers'] = claimers.data;
            };

            this.updateRewardRenderItem();
        })
        .then(() => {
            this.setState({showAlert: true});
            setTimeout(() => this.setState({showAlert: false}), 3000);
        })
        .catch(e => console.log(e));
    }

    getRewardRedemptionListData = async (rewardId) => {
        return (
            fetch(`${this.URL_PREFIX}/redemption/rewards-redemption?access_token=${access_token}&broadID=${this.state.broadcasterId}&rewardID=${rewardId}`, {method: "GET"})
            .then(res => res.json())
            .catch(e => console.log(e))
        );
    }

    getBroadcasterId = () => {
        return fetch(this.URL_PREFIX.concat(`/user/broadcasters?access_token=${access_token}`), {method: "GET"})
        .then(res => res.json())
        .then(data => {
            this.setState({broadcasterId: data.broadcasterId})
            return data;
        })
        .then(data => {
            this.props.passBroadcasterInfo(data);
        })
        .catch(e => console.log(e));
    }

    createReward = () => {

    }

    componentDidMount() {
        var promise = this.getBroadcasterId();
        promise.then(this.getRewardListData);
    }

    updateRewardRenderItem = () => {
        console.log(this.state.rewards);
        var rewardItems = this.state.rewards.map(reward =>
            <Reward title={reward.title} claimers={reward.claimers} key={reward.id} id={crypto.randomUUID()} />
        )
        this.setState({rewardItems: rewardItems});
    }

    render() {
        var alertText = '';
        if (this.state.showAlert) {
            alertText = (
                <Alert variant="success" onClose={() => this.setState({showAlert: false})} dismissible>
                    <Alert.Heading>成功取得忠誠點數清單</Alert.Heading>
                </Alert>
            );
        }
        
        return (
            <>
            {alertText}
            <Button onClick={this.getRewardListData} style={{margin: "10px"}}>刷新清單</Button>
            <Button onClick={this.createReward}>建立忠誠點數</Button>
            <Stack gap={3}>
                <Accordion>
                    {this.state.rewardItems}
                </Accordion>
            </Stack>
            </>
        );
    }
}