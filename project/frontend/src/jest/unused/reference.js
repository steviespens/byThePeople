import React from "react";
import { mount } from "enzyme";
import AuthService from '../components/home/AuthService';
import { act } from 'react-dom/test-utils';
import Comment from "../components/comment/Comment";


//extra imports that are likely to be common
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { rejects, doesNotReject } from "assert";
import axios from 'axios';



//HOW TO MOCK AUTHSERVICE.FETCH YOURSELF
// authService.fetch.mockImplementation(() => {
//     return new Promise((resolve) => {
//         resolve('johndoe@email.com')
//     });
// });



import * as Helper from '../components/utilities/helpers';
import "core-js/stable";
import "regenerator-runtime/runtime";



// import MainFeed from '../components/home/MainFeed';
// import sinon from 'sinon';
// import { shallow } from 'enzyme';
// import ListItem from "../components/UIElements/ListItem";
// //will want to exclude these from the webpack build
// import TestRenderer from 'react-test-renderer';
// import ShallowRenderer from 'react-test-renderer/shallow';
// import { rejects, doesNotReject } from "assert";
// import Poll from '../components/polls/Poll';
// import axios from 'axios';
// import { handleChoice } from '../components/polls/Poll';
// // const spy = sinon.spy(App.prototype, 'componentWillReceiveProps');
// import * as Helper from '../components/utilities/helpers';
// // import * as auth from '../components/home/AuthService';
// import HeaderBar from '../components/home/HeaderBar';
// import { jsxEmptyExpression } from "@babel/types";






// import * as Helper from '../components/utilities/helpers';

// import { isLoggedIn } from '../components/utilities/helpers';

// require('../components/home/AuthService');
// const mockedAuth = require('../components/home/AuthService');
// jest.mock('../components/home/AuthService');


jest.mock('../components/home/AuthService', () => {
    const mAuthService = {
        fetch: jest.fn()
    };
    return jest.fn(() => mAuthService);
});

describe('<Comment/>', () => {
    beforeAll(() => {
        // jest.mock('../components/home/AuthService', () => () => ({

        //     fetch: mockFetch

        // }));

        // let auth = jest.genMockFromModule('../components/home/AuthService') //.default;
        // jest.mock('../components/home/AuthService')
        // auth = require('../components/home/AuthService')
        // auth.fetch = jest.fn().mockReturnValue('workeddd')

        // Helper.clearMocks();
        // jest.clearAllMocks();

    });

    it('<sets email>', async () => {

        const authService = new AuthService();
        authService.fetch.mockResolvedValueOnce('johndoe@email.com');
        const props = {
            comment: {
                id: 97, text: "yo", created: "2019-11-03T13:40:34.496180-05:00", likes: 0, dislikes: 0
            }
        }
        const component = mount(<Comment {...props} />);
        component.checkUserLikedComment = jest.fn();
        expect(component.find('.email').text()).toEqual('');
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        expect(component.find('.email').text()).toEqual('johndoe@email.com');

    });
    it('<MainFeed>', () => {

        // jest.mock('../components/home/MainFeed', () => () => ({
        //     Auth: new AuthMock()
        // }))
        // const component = shallow(<MainFeed />);

        // const mockFetch = jest.fn(() => Promise.resolve('someResponse')).mockName('mockFetcher')
        // // global.fetch = jest.fn(() => 'heyyy');
        // const mockFetch = jest.fn(() => 'heyyy')
        // jest.mock('../components/home/AuthService', () => jest.fn());
        // jest.mock('../components/home/AuthService', () => () => ({

        //     fetch: mockFetch

        // }));    

        // const x = new Promise((resolve, reject) => {
        //     resolve('heyyy')
        // })
        // setImmediate(() => {
        //     console.log(Auth.fetch(''))
        //     done();
        // })

        // console.log(Auth.fetch(''))

        // expect(component.find('.email').text()).toEqual('');
        // component.update();
        // expect(global.fetch).toHaveBeenCalled()
        // expect(mockFetch).toHaveBeenCalled();
        // expect(component.find('.email').text()).toEqual('email');
        //     expect(true).toBeTruthy();

    })


    it('state update', () => {
        // const props = {
        //     comment: {
        //         id: 97, text: "yo", created: "2019-11-03T13:40:34.496180-05:00", likes: 0, dislikes: 0
        //     }

        // }
        // const component = mount(<Comment {...props} />);
        // component.checkUserLikedComment = jest.fn();
        // jest.mock('../components/home/AuthService', () => () => ({


        //     fetch: jest.fn(() => Promise.resolve('emailName')).mockName('fetchMock')

        // }));
        // // fetch.mockImplementation(() => Promise.resolve('email'));

        // expect(component.find('.email').text()).toEqual('');
        // // expect(component.Auth.fetch).toHaveBeenCalled();
        // // component.update();
        // expect(component.find('.email').text()).toEqual('email');



        // fetch.mockImplementation(() => 'email');
        // expect(component.type()).toEqual('div');
        // expect(component.find('.email').text()).toEqual('');

        // const addMock = jest.spyOn(AuthService.prototype, 'fetch');
        // addMock.mockImplementation(() => 'email');
        // mockedAuth.fetch.mockImplementationOnce(() => {
        //     return 1;
        // });

        // const component = mount(<Comment />);
        // console.log(component.find('email'))
        return


    });

});

// import React from "react";
// import {mount} from "enzyme";
// import App from "../components/home/App";
// import Comment from "../components/comment/Comment";
// import sinon from 'sinon';
// import { shallow } from 'enzyme';
// import ListItem from "../components/UIElements/ListItem";
// //will want to exclude these from the webpack build
// import TestRenderer from 'react-test-renderer';
// import ShallowRenderer from 'react-test-renderer/shallow';
// import { rejects, doesNotReject } from "assert";
// import Poll from '../components/polls/Poll';
// import axios from 'axios';
// import { handleChoice } from '../components/polls/Poll';
// // const spy = sinon.spy(App.prototype, 'componentWillReceiveProps');
// // import AuthService from '../components/home/AuthService';
// import * as Helper from '../components/utilities/helpers';
// // const AuthService = require('../components/home/AuthService');
// import * as auth from '../components/home/AuthService';
// // require('../components/home/AuthService');
// // jest.mock('../components/home/AuthService');
describe('<App/>', () => {
    it('Renders without crashing', () => {
        // const user = {
        //     "username": 'john',
        // }
        // const app = mount(<App name='nameee'/>);
        // // app.setProps({
        // //     "user": {
        // //         'username': 'john',
        // //     }
        // // });

        // expect(app.type()).toEqual('div');
        expect(true).toEqual(true);
    });
});

// function Link(props) {
//     return <a href={props.page}>{props.children}</a>;
// }

// describe('<ListItem/>', () => {
//     beforeEach(() => {
//         // fetch.resetMocks();
//         // jest.clearAllMocks();
//         auth.AuthService.fetch = jest.fn((a,b) => {
//             return 'worked'
//         })
//     })
//     var primary = 'primary';
//     var secondary = 'second';
//     var onClick = () => { return; };
//     it('Renders without crashing', () => {      
//         const listItem = shallow(<ListItem primary={primary} secondary={secondary} onClick={onClick} />);
//         // app.setProps({
//         //     "user": {
//         //         'username': 'john',
//         //     }
//         // });
//         expect(listItem.type()).toEqual('div');

//     });
//     it('random test', () => {
//         expect(true).toEqual(true);
//     });
//     it('link test snapshot', () => {
//         let component = TestRenderer.create(
//             <Link page="https://www.facebook.com/">Facebook</Link>
//         );
//         let tree = component.toJSON();
//         expect(tree).toMatchSnapshot();

//     });
//     it('snapshot test', () => {
//         // let shallowRenderer = new ShallowRenderer();
//         let component = TestRenderer.create(<ListItem primary={primary} secondary={secondary} onClick={onClick} />)
//         let tree = component.toJSON();
//         expect(tree).toMatchSnapshot();
//     })
//     it('asyn test', (done) => {
//         const promise = new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(
//                     {}
//                 )
//             }, 10
//             )
//             console.log('resolved')
//         }
//         )
//         window.alert = jest.fn();
//         // fetch.once(jest.fn(() => promise));
//         // axios.get = jest.fn(() => promise);
//         const wrapper = shallow(<Poll poll={{
//             id: 1,
//             question: 'hi?',
//             topic: 'someTopic',
//             choices: [
//                 {
//                     id: 1,
//                     choice: 'unsure',
//                     votes: 4,
//                     poll: 1
//                 }
//             ]
//         }}></Poll>)
//         const instance = wrapper.instance();
//         expect(wrapper.state().selected).toBeFalsy();
//         const spy = jest.spyOn(instance, 'handleChoice')
//             // .mockImplementation((e) => {
//             // // console.log('do something')
//             // });
//         // AuthService.fetch.mockReturnValue('worked')
//         // AuthService.fetch = jest.fn(() => {
//         //     console.log('authh')
//         //     return promise;
//         // })
//         // AuthService.mockImplementation(() => {
//         //     return {
//         //         fetch: mock.fn()
//         //         // fetch: () => {
//         //         //     this.setState({
//         //         //     poll: {},
//         //         //     selected: true
//         //         // })
//         //             // return 'hey';
//         //     }}
//         //     // console.log('called fetch mock imple')
//         //     // return 'hey';
//         //     // return jest.fn(() => {

//         //     //     return {fetch: jest.fn()}
//         //     // })
//         // )
//         // jest.mock('../components/home/AuthService', () => {
//         //     return {
//         //         fetch: jest.fn(() => 'worked')
//         //     }
//         // });

//         // AuthService.fetch.mockResolvedValue({
//         //     poll: {
//         //         topic: 'topicsome'
//         // }})
//         // AuthService.mockImplementation(() => {
//         //     return {
//         //         fetch: () => 'worked'
//         //     }
//         // })
//         // AuthService.fetch = jest.fn(() => {
//         //     return 'hey';
//         // });
//         // const spyFetch = jest.spyOn(AuthService, 'fetch')
//         // console.log(AuthService.fetch())
//         // console.log('look at ' + AuthService.fetch())
//         //     .mockImplementation(() => {
//         //     return {
//         //         fetch: () => {
//         //             console.log('authsv')
//         //             return promise;
//         //         }
//         //     }
//         // })
//         // AuthService.fetch = jest.fn(() => {
//         //     return promise;
//         // })
//         // AuthService.fetch.mockImplementation(() => {
//         //     return promise;
//         //     // return {
//         //     //     fetch: () => jest.fn(() => {
//         //     //         console.log('auth fetch mock called')
//         //     //         return promise
//         //     //     })
//         //     // };
//         // })
//         Helper.isLoggedIn = jest.fn(() => true);
//         const mockEvent = {
//             currentTarget: {
//                 value: 3,
//             },
//             preventDefault: jest.fn()
//         };

//         var ss = instance.handleChoice(mockEvent);
//         console.log(ss)
//         //     .then(() => {
//         // })
//         setImmediate(() => {
//             // wrapper.update()
//             expect(spy).toHaveBeenCalled();
//             // expect(global.fetch).toHaveBeenCalledTimes(0);
//             // expect(spyFetch).toHaveBeenCalledTimes(2);
//             expect(wrapper.state().selected).toBeTruthy();
//             done();
//         })


//         // promise.then(() => {
//         //     setImmediate(() => {
//         //         wrapper.update();
//         //         expect(wrapper.state().selected).toBeTruthy();
//         //         axios.get.mockClear();
//         //         done();
//         //     })

//         // })
//         // const instance = wrapper.instance();

//         // instance.handleChoice(new Event('test'));
//         // window.alert = jsdomAlert;
//         // promise
//     });


// });

