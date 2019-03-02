import React from "react";
import PropTypes from "prop-types";
import { uppercaseFirst } from "./utilities/helpers.js";
//import key function, which when we pass el to it, will create good keys
import key from "weak-key";
//data is a prop passed in App instantiation
const Table = ({ data }) =>
    !data.length ? (
        <p>Nothing to show</p>
    ) : (
            // <div className="twelve columns">
            // <div>
            <section>
                {/* <h2 className="subtitle">
                    Showing <strong>{data.length} items</strong>
                </h2> */}
                
                <table className="u-full-width">
                    <thead>
                        <tr>
                            {/* Object.entries returns an array of a given object's own enumerable property [key, value] pairs */}
                            {/* el[0] gets first name/last name */}
                            {/* data[0] just uses the first element in the json to extract what the th's should be */}
                            {/* {Object.entries(data[0]).map(el => <th key={key(el)}>{el[0]}</th>)} */}
                            {<th>{uppercaseFirst(Object.entries(data[0])[1][0])}</th>}
                            {<th>{uppercaseFirst(Object.entries(data[0])[6][0])}</th>}

                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map(el => ( */}
                            {/* // clearly each json element implicity has an id, even if it's not written in the sample data source code */}
                            {/* <tr key={el.id}> */}
                                {/* el[1] gets david and trone */}
                                {/* {Object.entries(el).map(el => <td key={key(el)}>{el[1]}</td>)} */}
                            {/* {Object.entries(el).map(el => <td key={key(el)}>{el[1]}</td>)} */}
                        {data.map(el => (
                            <tr key={el.id}>
                                {<td>{uppercaseFirst(Object.entries(el)[1][1])}</td>}
                                {<td><a href={Object.entries(el)[8][1]}>{Object.entries(el)[6][1]}</a></td>}
                            </tr>
                            )
                        )}
                            {/* </tr> */}
                        {/* ))} */}
                    </tbody>
                </table>
            {/* // </div> */}
            </section >
        );

Table.propTypes = {
    data: PropTypes.array.isRequired
};
export default Table;

//to do
//learn weak-key and mapping, fetch, and api endpoint