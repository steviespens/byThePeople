import ListItem from "../components/UIElements/ListItem";
import React from "react";
import { shallow } from 'enzyme';

describe('<ListItem/>', () => {
    it('Renders without crashing', () => {
        let component = shallow(<ListItem></ListItem>);
        expect(component.type()).toEqual('div');
        expect(component).toMatchSnapshot();
    });
    it('check props primary and secondary', () => {
        let props = {
            primary: 'Primary',
            secondary: 'Secondary'
        },
        component = shallow(<ListItem {...props}></ListItem>);
        expect(component.find('p').length).toEqual(2);
        expect(component.find('p').at(0).text()).toEqual('Primary');
        expect(component.find('p').at(1).text()).toEqual('Secondary');
    });
    it('check onClick fires', () => {
        let mockFn = jest.fn(),
        component = shallow(<ListItem onClick={mockFn}></ListItem>);
        component.simulate('click');
        expect(mockFn).toHaveBeenCalled();
    })
});
