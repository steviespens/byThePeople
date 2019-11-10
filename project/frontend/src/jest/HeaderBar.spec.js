import React from "react";
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import "regenerator-runtime/runtime";

import AuthService from '../components/home/AuthService';
import HeaderBar from '../components/home/HeaderBar';
import * as Helper from '../components/utilities/helpers';


jest.mock('../components/home/AuthService', () => {
    const mAuthService = {
        fetch: jest.fn()
    };
    return jest.fn(() => mAuthService);
});

describe('<HeaderBar/>', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        Helper.isLoggedIn = jest.fn();
    });
    it('Renders without crashing', () => {
        let component = shallow(<HeaderBar/>);
        expect(component.type()).toEqual('div');
    });
    it('is logged in', () => {
        Helper.isLoggedIn.mockReturnValueOnce(false);
        let component = shallow(<HeaderBar />);
        expect(component.find('LoginHeader')).toHaveLength(1);
    });
    it('is not logged in', () => {
        Helper.isLoggedIn.mockReturnValueOnce(true);
        let component = shallow(<HeaderBar />);
        expect(component.find('button')).toHaveLength(1);
    });
    it('logout button', async () => {
        Helper.isLoggedIn.mockReturnValueOnce(true);
        let authService = new AuthService();
        authService.logout = jest.fn()
        let windowSpy = jest.fn()
        window.location.reload = windowSpy
        let component = shallow(<HeaderBar />);

        component.find('button').simulate('click')
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        })

        expect(windowSpy).toHaveBeenCalledTimes(1)
        expect(windowSpy).toHaveBeenCalledTimes(1)
    });
});

