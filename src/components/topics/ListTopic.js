import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/AxiosIntance";
import '../css/navBar.css';
import AddTopic from "./AddTopic";
import swal from 'sweetalert';
import EditTopic from "./EditTopic";

const ListTopic = () => {
    const [topics, setTopics] = useState([]);
    const [reload, setReload] = useState(false);
    const [topicById, setTopicById] = useState([]);
    const [notification, setNotification] = useState('');
    const [formAdd, setFormAdd] = useState("none");
    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-topics.php');
            setTopics(result);
        }
        fetchData();
        setReload(false);
    }, [reload]);

    const deleteTopic = async (topicId) => {

        swal({
            title: "Xác nhận xóa?",
            text: "Xóa 1 topic",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const result = await AxiosInstance().get('/delete-topic.php?id=' + topicId);
                    console.log(result);
                    if (result.error) swal("Xóa topic thất bại");
                    else {
                        swal("xóa topic thành công");
                        setReload(true);
                    }

                } else {
                    swal("Hủy bỏ xóa");
                }
            });

    }
    const editTopic = async (topicId, index) => {
        const result = await AxiosInstance().get('/get-topic-detail.php?id=' + topicId);
        // setFormEdit("inline-block");

        for (let i = 0; i < topics.length; i++) {

            if (i == index) {
                if (formAdd != "none") setFormAdd("none");
                const viewEdit = document.getElementById("formEdit" + i);
                viewEdit.style.display = "inline-block";
            } else {
                const viewEdit = document.getElementById("formEdit" + i);
                viewEdit.style.display = "none";
            }

        }
        setTopicById(result);

    }
    return (

        <div>
            <p style={{ textAlign: "center", background: "#33FF66", marginTop: 10, color: "white", fontSize: 20 }}>{notification}</p>

            <div style={{ display: formAdd }}>
                <AddTopic setReload={setReload} setNotification={setNotification} />
            </div>
            <button style={{ marginTop: 10, display: formAdd == "none" ? "inline-block" : "none" }} onClick={() => { setFormAdd("inline-block"); editTopic(0, -1) }}>Add</button><br />

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
                                    <button className='btn btn-primary' value={item.id} onClick={(e) => editTopic(e.target.value, index)}>Sửa</button>
                                    <button className='btn btn-danger' value={item.id} onClick={(e) => deleteTopic(e.target.value)} >Xóa</button>
                                    <br />
                                    <div style={{ display: "none" }} id={"formEdit" + index}>
                                        <EditTopic setReload={setReload} topicById={topicById} />
                                    </div>
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