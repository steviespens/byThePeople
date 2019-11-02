import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useState, useEffect } from 'react';

import { withStyles, createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';

// import AuthService from './AuthService';

const styles = createStyles({
    root: {
        width: '90%',

        // minHeight: '80vh',
        // maxHeight: '80vh',
        // minWidth: '80vw',
        // maxWidth: '80vw',
        // background: '#eee',
        // marginBottom: '2%',
    },
    dialog: {
        // minHeight: '80vh',
        maxHeight: '100vh',
        // minWidth: '80vw',
        maxWidth: '100vw',
    },
    dialogContent: {
        maxHeight: '70vh',
        width: '77vw',
        background: '#121848',


    },
    paper: {
        width: '40%',
    },
    // textField: {
    //     width: '90%',
    // }
   
});
const useStyles = makeStyles({
    paper: {
        width: '25%',
    },
    
});
function AdditionalInfoForm(props) {

    const open = props.open;
    const onClose = props.onClose;
    const handleFormSubmit = props.handleFormSubmit;
    const handleChange = props.handleChange;
    const genders = [
        {
            value: 'male',
            label: 'Male',
        },
        {
            value: 'female',
            label: 'Female',
        },
        {
            value: 'non-binary',
            label: 'Non-binary',
        }
    ]
    const politicalParties = [
        {
            value: 'democrat',
            label: 'Democrat',
        },
        {
            value: 'republican',
            label: 'Republican',
        },
        {
            value: 'libertarian',
            label: 'Libertarian',
        },
        {
            value: 'green',
            label: 'Green Party',
        },
        {
            value: 'independent',
            label: 'Independent',
        },
        {
            value: 'other',
            label: 'Other',
        }
    ]

    const ethnicities = [
        {
            value: 'caucasian',
            label: 'Caucasian',
        },
        {
            value: 'african-american',
            label: 'African-American',
        },
        {
            value: 'american-indian',
            label: 'American Indian or Alaska Native',
        },
        {
            value: 'hispanic',
            label: 'Hispanic or Latino',
        },
        {
            value: 'asian',
            label: 'Asian',
        },
        {
            value: 'pacific-islander',
            label: 'Native Hawaiian or Pacific Islander',
        },
        {
            value: 'other',
            label: 'Other',
        }
    ]
    const educations = [
        {
            value: 'less-than-high-school',
            label: 'Less than High School',
        },
        {
            value: 'high-school',
            label: 'High School',
        },
        {
            value: 'some-college',
            label: 'Some College',
        },
        {
            value: 'associate',
            label: 'Associate\'s Degree or Tradeschool',
        },
        {
            value: 'undergraduate',
            label: 'Undergraduate Degree',
        },
        {
            value: 'master',
            label: 'Master\'s Degree',
        },
        {
            value: 'doctorate',
            label: 'Doctoral Degree',
        }
    ]
    const salaries = [
        {
            value: 0,
            label: 'Less than $10,000',
        },
        {
            value: 1,
            label: '$10,000 - $40,000',
        },
        {
            value: 2,
            label: '$40,000 - $70,000',
        },
        {
            value: 3,
            label: '$70,000 - $100,000',
        },
        {
            value: 4,
            label: '$100,000 - $130,000',
        },
        {
            value: 5,
            label: '$130,000 - $160,000',
        },
        {
            value: 6,
            label: 'Over $160,000',
        }
    ]
    var ages = [
        {
            value: 0,
            label: 'Less than 18'
        }
    ]
    for (var i = 18; i < 80; i++) {
        ages.push(
            {
                value: i,
                label: i.toString()
            }
        )
    }
    ages.push(
        {
            value: 100,
            label: 'Greater than 80'
        }
    )

    const classes = useStyles();
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='lg'
            classes={{
                paper: classes.paper,
            }}
            // scroll="paper"
        >
            <DialogContent >
                <div className="additional-info-card">
                    <h1>Register</h1>
                    <form id='additional-info-form' onSubmit={handleFormSubmit}>
                        <input
                            className="form-item"
                            placeholder="Email"
                            name="email"
                            type="text"
                            value={props.email}
                            onChange={handleChange('email')}
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password1"
                            type="password"
                            value={props.password1}
                            onChange={handleChange('password1')}
                        />
                        <input
                            className="form-item"
                            id="form-item-last"
                            placeholder="Confirm password"
                            name="password2"
                            type="password"
                            value={props.password2}
                            onChange={handleChange('password2')}
                        />
                        <TextField
                            id='additional-form-textfield'
                            select
                            label="Gender"
                            className={"gender-selector " + props.classes.root}
                            value={props.gender}
                            onChange={handleChange('gender')}
                        >
                            {genders.map(option => 
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            )}
                        </TextField>
                        <TextField
                            select
                            label="Political Party"
                            className={"political-selector " + props.classes.root}
                            value={props.politicalParty}
                            onChange={handleChange('politicalParty')}
                        >
                            {politicalParties.map(option =>
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            )}
                        </TextField>

                        <TextField
                            select
                            label="Ethnicity"
                            className={"ethnicity-selector " + props.classes.root}
                            value={props.ethnicity}
                            onChange={handleChange('ethnicity')}
                        >
                            {ethnicities.map(option =>
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            )}
                        </TextField>
                        <TextField
                            select
                            label="Education"
                            className={"education-selector " + props.classes.root}
                            value={props.education}
                            onChange={handleChange('education')}
                        >
                            {educations.map(option =>
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            )}
                        </TextField>
                        <TextField
                            select
                            label="Salary"
                            className={"salary-selector " + props.classes.root}
                            value={props.salary}
                            onChange={handleChange('salary')}
                        >
                            {salaries.map(option =>
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            )}
                        </TextField>
                        <TextField
                            select
                            label="Age"
                            className={"age-selector " + props.classes.root}
                            value={props.age}
                            onChange={handleChange('age')}
                        >
                            {ages.map(option =>
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            )}
                        </TextField>

                        <input
                            className="login-form-submit"
                            value="Submit"
                            type="submit"
                        />
                    </form>
                    {props.errorMessage != null ? props.errorMessage : null}
                </div>
            </DialogContent>
        </Dialog>
    );


}
export default withStyles(styles)(AdditionalInfoForm);

