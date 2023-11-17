import React from "react";
import List from "./List";
import '../css/navBar.css';
const News = (props) => {
    const { user } = props
    return (
        <div>

            <ul>
                <li><a class="active" href="/">News</a></li>
                <li><a href="/list-topics">Topics</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
            </ul>
            <List user={user} />
        </div>
    )
}

export default News;