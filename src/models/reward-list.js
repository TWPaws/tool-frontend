import React, { Component } from "react";
import { Accordion, Stack, Button, Alert } from "react-bootstrap";
import { Reward } from './reward';
import { RewardEditor } from "./reward-editor";

//const access_token = encodeURIComponent('zzphl0ev6dtb1v9heg7s9rpngvgh69');
var access_token;

export class RewardList extends Component {
    URL_PREFIX = 'https://www.twpaws.live/api';
    //URL_PREFIX = 'http://127.0.0.1:5000';
    state = {
        rewards: [],
        broadcasterId: '',
        rewardItems: [],
        showAlert: false,
        showCreateModal: false,
        isReloading: false
    }

    getRewardListData = () => {
        this.setState({isReloading: true});
        fetch(this.URL_PREFIX.concat(`/redemption/rewards`), {method: "GET"})
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
            this.setState({
                showCreateModal: false,
                isReloading: false
            });
        })
        .catch(e => console.log(e));
    }

    getRewardRedemptionListData = async (rewardId) => {
        return (
            fetch(`${this.URL_PREFIX}/redemption/rewards-redemption?rewardID=${rewardId}`, {method: "GET"})
            .then(res => res.json())
            .catch(e => console.log(e))
        );
    }

    getBroadcasterId = () => {
        return fetch(this.URL_PREFIX.concat(`/user/broadcasters`), {method: "GET"})
        .then(res => res.json())
        .then(data => {
            this.setState({broadcasterId: data.broadcaster_id});
            return data;
        })
        .then(data => {
            this.props.passBroadcasterInfo(data);
        })
        .catch(e => console.log(e));
    }

    createReward = () => {
        this.setState({showCreateModal: true});
    }

    componentDidMount() {
        access_token = sessionStorage.getItem('access_token');
        var promise = this.getBroadcasterId();
        promise.then(this.getRewardListData);
    }

    deleteReward = (rewardId) => {
        fetch(this.URL_PREFIX.concat(`/redemption/rewards/${rewardId}`), {method: "DELETE"})
        .then(res => res.json())
        .then(data => {
            this.getRewardListData();
        })
    }

    hideCreateModal = () => {
        this.setState({showCreateModal: false});
    }

    updateRewardRenderItem = () => {
        var rewardItems = this.state.rewards.map(reward =>
            <Reward 
                title={reward.title} 
                claimers={reward.claimers} 
                key={reward.id} 
                id={reward.id}
                deleteReward={this.deleteReward} />
        )
        this.setState({rewardItems: rewardItems});
    }

    render() {
        var alertText = '';
        if (this.state.showAlert) {
            alertText = (
                <Alert 
                    variant="success"
                    className="position-absolute top-0 start-50"
                    onClose={() => this.setState({showAlert: false})} 
                    style={{zIndex: 9999}}
                    dismissible
                >
                    <Alert.Heading>成功取得忠誠點數清單</Alert.Heading>
                </Alert>
            );
        }
        
        return (
            <>
            {alertText}
            <Button 
                onClick={this.getRewardListData} 
                style={{margin: "10px"}}
                disabled={this.state.isReloading}
            >
                {this.state.isReloading ? "刷新中..." : "刷新清單"}
            </Button>
            <Button onClick={this.createReward}>建立忠誠點數</Button>
            <Stack gap={3}>
                <Accordion>
                    {this.state.rewardItems}
                </Accordion>
            </Stack>
            <RewardEditor 
                show={this.state.showCreateModal} 
                title="建立忠誠點數" 
                hide={this.hideCreateModal} 
                submitTarget={this.URL_PREFIX.concat(`/redemption/rewards`)}
                submitRefresh={this.getRewardListData}
                access_token={access_token}
                broadcaster_id={this.state.broadcasterId}
            />
            </>
        );
    }
}