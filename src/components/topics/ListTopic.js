import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/AxiosIntance";
import '../css/navBar.css';
import AddTopic from "./AddTopic";
import swal from 'sweetalert';
import EditTopic from "./EditTopic";

const ListTopic = () => {
    const [topics, setTopics] = useState([]);
    const [reload, setReload] = useState(false);
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
    topics.sort((a, b) => b.id - a.id);
    return (

        <div>
            <div style={{ marginTop: 10 }}>
                <AddTopic setReload={setReload} />
            </div>

            <h1>list topic</h1>
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

                                    <button className='btn btn-primary' style={{ padding: 0, marginRight: 5 }}><EditTopic setReload={setReload} id={item.id} /></button>
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