import React, { useEffect, useState } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, []);

    return (
        <div id="main" className={isLoading ? "is-loading" : ""}>
            <h1>
                Travel <span style={{ color: "#FF7403" }}>Eaze</span> <br />
            </h1>
            <p className="tagline">
                Your commute, connected, private, and always in your control.
            </p>
            <Link to="/login">
                <button className="get-started-btn">Get Started</button>
            </Link>
        </div>
    );
};

export default Landing;
