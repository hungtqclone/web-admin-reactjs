import React from "react";
import ListTopic from "./ListTopic";
const Topics = (props) => {
    const { saveUser } = props;
    return (
        <div>
            <ul>
                <li><a href="/">News</a></li>
                <li><a class="active" href="/list-topics">Topics</a></li>
                <li><a href="/thong-ke">Thống kê</a></li>
                <li><a href="#about">About</a></li>
                <li style={{ position: "absolute", top: 11, right: 100 }}><button onClick={() => saveUser(null)}>Đăng xuất</button></li>


            </ul>
            <ListTopic />

        </div>
    )
}

export default Topics;