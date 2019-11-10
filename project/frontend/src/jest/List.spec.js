import List from "../components/UIElements/List";
import React from "react";
import { shallow } from 'enzyme';


describe('<List/>', () => {
    it('Renders without crashing', () => {
        let children = (<p className='test-p'>This is a child</p>)
        let component = shallow(<List>{children}</List>);
        expect(component.type()).toEqual('div');
        expect(component).toMatchSnapshot();
        expect(component.find('p').text()).toEqual('This is a child');
    });
});
