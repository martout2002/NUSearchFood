import "../App.css";

import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const BasicThreadList: React.FC = () => {
    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h4>{"Welcome to my forum!"}</h4>
            <ul>
                <li>
                    <Link to="/thread/1">{<Button variant="contained">Inspirational Quotes</Button>}</Link>
                    {" by Aiken"}
                </li>
            </ul>
        </div>
    );
};

export default BasicThreadList;
