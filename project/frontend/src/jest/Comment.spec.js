import React from "react";
import { mount } from "enzyme";
import { act } from 'react-dom/test-utils';
import "regenerator-runtime/runtime";

import * as Helper from '../components/utilities/helpers';

import Comment from "../components/comment/Comment";
import AuthService from '../components/home/AuthService';

jest.mock('../components/home/AuthService', () => {
    const mAuthService = {
        fetch: jest.fn()
    };
    return jest.fn(() => mAuthService);
});


let authService, props, spy;
describe('<Comment/>', () => {
    
    beforeEach(() => {
        
        authService = new AuthService();
        props = {
            comment: {
                id: 97, text: "yo", created: "2019-11-03T13:40:34.496180-05:00", likes: 0, dislikes: 0
            }
        }
        spy = jest.spyOn(authService, 'fetch')

    });
    
    afterEach(() => {
        jest.clearAllMocks()

    })

    it('<sets email>', async () => {
        
        authService.fetch.mockResolvedValue('johndoe@email.com');
        let component = mount(<Comment {...props} />);
        
        expect(component.find('.email').text()).toEqual('');

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });
        
        expect(component.find('.email').text()).toEqual('johndoe@email.com');

    });

    it('bad email request', async () => {

        authService.fetch.mockRejectedValue('bad request')
        
        let component = mount(<Comment {...props} />);
        expect(component.find('.email').text()).toEqual('');
        
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        expect(component.find('.email').text()).toEqual('');
        authService.fetch = jest.fn()

    });

    describe('test like button', () => {
        let setState, useStateSpy;
        
        beforeAll(() => {
            Helper.isLoggedIn = jest.fn()
            setState = jest.fn();
            useStateSpy = jest.spyOn(React, 'useState')
            useStateSpy.mockImplementation((init) => [init, setState]);
            jest.spyOn(window, 'alert').mockImplementation(() => { return });

        })

        beforeEach(() => {
            authService.fetch.mockReset()
        })

        afterAll(() => {
            jest.ResetAllMocks()
        })

        it('like comment, is logged in', async () => {
            let likeObject = ['liked']
            authService.fetch.mockResolvedValueOnce('johndoe@email.com').mockResolvedValueOnce(0).mockResolvedValueOnce(likeObject).mockResolvedValue(1);
            Helper.isLoggedIn.mockReturnValue(true)
            let mockEvent = {
                currentTarget: {
                    value: 1,
                },
                preventDefault: jest.fn()
            };

            let component = mount(<Comment {...props} />);

            component.find('.like-button').first().simulate('click', mockEvent)
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
            });

            expect(setState).toHaveBeenCalledWith('liked')

        });

        it('like comment, not logged in', async () => {
            let likeObject = ['liked']
            authService.fetch.mockResolvedValueOnce('johndoe@email.com').mockResolvedValueOnce(0).mockResolvedValueOnce(likeObject).mockResolvedValue(1);
            Helper.isLoggedIn.mockReturnValue(false)
            
            let mockEvent = {
                currentTarget: {
                    value: 1,
                },
                preventDefault: jest.fn()
            };

            let component = mount(<Comment {...props} />);

            component.find('.like-button').first().simulate('click', mockEvent)

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
            });

            expect(window.alert).toHaveBeenCalledTimes(1)
            expect(setState).not.toHaveBeenCalled()

        });

        it('dislike comment, is logged in', async () => {
            let likeObject = ['disliked']
            authService.fetch.mockResolvedValueOnce('johndoe@email.com').mockResolvedValueOnce(0).mockResolvedValueOnce(likeObject).mockResolvedValue(2);
            Helper.isLoggedIn.mockReturnValue(true)
            let mockEvent = {
                currentTarget: {
                    value: 2,
                },
                preventDefault: jest.fn()
            };

            let component = mount(<Comment {...props} />);

            await act(async () => {
                component.find('.like-button').at(1).simulate('click', mockEvent)
                await new Promise(resolve => setTimeout(resolve, 1000));
            });
            
            expect(setState).toHaveBeenCalledWith('disliked')


        });

        it('dislike comment, not logged in', async () => {
            let likeObject = ['disliked']
            authService.fetch.mockResolvedValueOnce('johndoe@email.com').mockResolvedValueOnce(0).mockResolvedValueOnce(likeObject).mockResolvedValue(2);
            Helper.isLoggedIn.mockReturnValue(false)

            let mockEvent = {
                currentTarget: {
                    value: 2,
                },
                preventDefault: jest.fn()
            };

            let component = mount(<Comment {...props} />);

            component.find('.like-button').at(1).simulate('click', mockEvent)

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
            });

            expect(window.alert).toHaveBeenCalledTimes(1)
            expect(setState).not.toHaveBeenCalled()

        });
    });
   
});


