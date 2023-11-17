import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/AxiosIntance";
import '../css/navBar.css';
import AddTopic from "./AddTopic";


const ListTopic = () => {
    const [topics, setTopics] = useState([]);
    const [reload, setReload] = useState(false);
    const [notification, setNotification] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-topics.php');
            console.log(result);
            setTopics(result);
        }
        fetchData();
        setReload(false);
    }, [reload]);

    const deleteTopic = async (topicId) => {

        if (window.confirm("Delete topic id = " + topicId)) {
            const result = await AxiosInstance().get('/delete-topic.php?id=' + topicId);
            console.log(result);
            if (result.error) alert("Xóa topic thất bại");
            else {
                alert("xóa topic thành công");
                setReload(true);
            }

        }

    }
    return (

        <div>
            <p style={{ textAlign: "center", background: "#33FF66", marginTop: 10, color: "white", fontSize: 20 }}>{notification}</p>
            <AddTopic setReload={setReload} setNotification={setNotification} />
            <h1>list topic</h1>
            {/* <a href="/add-topic">Add Topic</a> */}
            <table className='table'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Thao tác</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        topics.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button className='btn btn-primary'>Sửa</button>
                                    <button className='btn btn-danger' value={item.id} onClick={(e) => deleteTopic(e.target.value)} >Xóa</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    )
}

export default ListTopic;