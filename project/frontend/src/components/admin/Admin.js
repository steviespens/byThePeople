import React, { Component, useState, useEffect } from 'react';
import AuthService from '../home/AuthService';
import TextField from '@material-ui/core/TextField';
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        margin: '0%',
        padding: '1%',
        // alignItems: 'center',

    },
    form: {
        margin: '0%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',


    },

});

function Admin(props) {
    const Auth = new AuthService();
    const [question, setQuestion] = useState('');
    const [topic, setTopic] = useState('');
    const [choices, setChoices] = useState({});
    const [numChoices, setNumChoices] = useState(0);
    const [counter, setCounter] = useState(0);
    const [related_bill, setRelatedBill] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!isInputValid()) {
            return
        }
        Auth.fetch('api/polls/add_poll/', {
            method: 'POST',
            body: JSON.stringify({
                topic,
                question,
                choices,
                related_bill
            })
        }).then(data => {
            console.log(data)
            window.location.reload();
        })
    }
    const updateChoices = e => {
        setChoices({
            ...choices,
            [e.target.name]: e.target.value
        });
    };

    const addItem = () => {
        setChoices({
            ...choices,           
            [counter.toString()]: ''           
        });
        setNumChoices(numChoices + 1);
        setCounter(counter + 1);        
    };

    const deleteItem = e => {
        var tmp = choices;
        delete tmp[e.target.name];
        setChoices(tmp);
        setNumChoices(numChoices - 1);
    }

    //returns false if input is invalid
    //relatedBill field is not required
    const isInputValid = () => {
        if (question == '' || topic == '' || numChoices < 1) {
            return false;
        }
        for (var c of Object.entries(choices)) {
            const value = c[1];
            if (value == '') return false;
        }
        return true;
    }

    const choiceList = () => {
        var l = [];
        var count = 0;
        for (var c of Object.entries(choices)) {
            const key = c[0];
            const value = c[1];
            l.push((
                <div>
                    <TextField
                    key={parseInt(key)}
                    name={key}
                    label={"Choice " + (count + 1)}
                    className=""
                    value={value}
                    onChange={updateChoices}
                    >
                    </TextField>
                    <button name={key} onClick={deleteItem}>Delete</button>
                </div>
            ));
            count = count + 1;
        }
        return l;
    }

    return (
        <div className={props.classes.root}>
            <form onSubmit={handleFormSubmit} className={props.classes.form}>
                <TextField
                    label="Topic"
                    placeholder="Type your topic here"
                    className=""
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                >
                </TextField>    
                <TextField
                    label="Question"
                    placeholder="Type your question here"
                    className=""
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                >
                </TextField>
                <TextField
                    label="Related bill"
                    placeholder="Enter the bill id (e.g. hr1063-116)"
                    className=""
                    value={related_bill}
                    onChange={(e) => setRelatedBill(e.target.value)}
                >
                </TextField>               
        
                {choiceList()}

                <input
                    className="form-submit"
                    value="SUBMIT"
                    type="submit"
                />
            </form>
            <button onClick={addItem}>Add choice</button>
        </div>
    );
    

}

export default withStyles(styles)(Admin);