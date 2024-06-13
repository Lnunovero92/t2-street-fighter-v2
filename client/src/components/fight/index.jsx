import React from 'react';

import { getFighters } from '../../services/domainRequest/fightersRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';
import { Button } from '@material-ui/core';

import './fight.css'

class Fight extends React.Component {
    state = {
        fighters: [],
        fighter1: null,
        fighter2: null
    };

    async componentDidMount() {
        const fighters = await getFighters();
        if(fighters && !fighters.error) {
            this.setState({ fighters });
        }
    }

    onFightStart = async () => {
        const { fighter1, fighter2 } = this.state;

        if (!fighter1 || !fighter2) {
            alert("Please select both fighters");
            return;
        }

        try {
            const response = await fetch('/api/fights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fighter1: fighter1.id, fighter2: fighter2.id }),
            });

            if (response.ok) {
                const fightResult = await response.json();
                this.setState({ fightResult });
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (err) {
            console.error("Error starting fight:", err);
            alert("An error occurred while starting the fight");
        }
    }

    onCreate = (fighter) => {
        this.setState({ fighters: [...this.state.fighters, fighter] });
    }

    onFighter1Select = (fighter1) => {
        this.setState({fighter1 });
    }

    onFighter2Select = (fighter2) => {
        this.setState({ fighter2 });
    }

    getFighter1List = () => {
        const { fighter2, fighters } = this.state;
        if(!fighter2) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter2.id);
    }

    getFighter2List = () => {
        const { fighter1, fighters } = this.state;
        if(!fighter1) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter1.id);
    }

    render() {
        const  { fighter1, fighter2 } = this.state;
        return (
            <div id="wrapper">
                <NewFighter onCreated={this.onCreate} />
                <div id="figh-wrapper">
                    <Fighter selectedFighter={fighter1} onFighterSelect={this.onFighter1Select} fightersList={this.getFighter1List() || []} />
                    <div className="btn-wrapper">
                        <Button onClick={this.onFightStart} variant="contained" color="primary">Start Fight</Button>
                    </div>
                    <Fighter selectedFighter={fighter2} onFighterSelect={this.onFighter2Select} fightersList={this.getFighter2List() || []} />
                </div>
            </div>
        );
    }
}

export default Fight;