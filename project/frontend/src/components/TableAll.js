import React from "react";
import PropTypes from "prop-types";
import { uppercaseFirst } from "./utilities/helpers.js";
import key from "weak-key";
const TableAll = ({ data, fields }) => {
    return (!data.length ? (
        <p>Nothing to show</p>
    ) : (
            <div>
                {/* <h2 className="subtitle">
                    Showing <strong>{data.length} items</strong>
                </h2> */}

                <table className="u-full-width">
                    <thead>
                        <tr>
                            {fields.map(el => <th key={el}>{uppercaseFirst(el)}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(el => (
                            <tr key={el.id}>
                                {Object.entries(el).map(el => {
                                    return ((fields.includes(el[0])) ? <td key={key(el)}>{el[1]}</td> : null);
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ));
}

// TableAll.propTypes = {
//     data: PropTypes.array.isRequired,
//     fields: PropTypes.array.isRequired
// };
export default TableAll;

