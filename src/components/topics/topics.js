import React from "react";
import ListTopic from "./ListTopic";
const Topics = () => {
    return (
        <div>
            <ul>
                <li><a href="/">News</a></li>
                <li><a class="active" href="/list-topics">Topics</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>

            </ul>
            <ListTopic />

        </div>
    )
}

export default Topics;