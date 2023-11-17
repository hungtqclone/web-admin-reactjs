import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/AxiosIntance";
import Add from "./Add";
import Edit from "./Edit";
const List = (props) => {
    const { user } = props;
    const [news, setNews] = useState([])
    const [reload, setReload] = useState(false);
    const [newById, setNewById] = useState([]);
    const [formAdd, setFormAdd] = useState("none");
    const [formEdit, setFormEdit] = useState("none")

    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-new.php');
            setNews(result);
        }
        fetchData();
        setReload(false)
    }, [reload]);

    const deleteNews = async (newsId) => {

        // alert("Delete new id = " + newsId.target.id);

        // var answer = window.confirm("Delete new id = " + newsId.target.id);
        if (window.confirm("Delete new id = " + newsId)) {
            await AxiosInstance().get('/delete-new.php?id=' + newsId);
            setReload(true);
        }

    }
    const editNews = async (newsId, index) => {
        const result = await AxiosInstance().get('/get-new-detail.php?id=' + newsId);
        // setFormEdit("inline-block");

        for (let i = 0; i < news.length; i++) {

            if (i == index) {
                if (formAdd != "none") setFormAdd("none");
                const viewEdit = document.getElementById("formEdit" + i);
                viewEdit.style.display = "inline-block";
            } else {
                const viewEdit = document.getElementById("formEdit" + i);
                viewEdit.style.display = "none";
            }

        }
        setNewById(result);

    }

    return (
        <div>
            <ul>
                <li><a class="active" href="/">News</a></li>
                <li><a href="/list-topics">Topics</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
            </ul>
            <div style={{ display: formAdd }}>
                <Add user={user} setReload={setReload} />
            </div>
            <button style={{ marginTop: 10, display: formAdd == "none" ? "inline-block" : "none" }} onClick={() => { setFormAdd("inline-block"); editNews(0, -1) }}>Add</button><br />

            {/* <div style={{ display: formEdit }}>
                <Edit newById={newById} user={user} />
            </div> */}

            <h1>List news</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Thao tác</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        news.map((item, index) => (
                            <tr key={index}>

                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>

                                    <button className='btn btn-primary' value={item.id} onClick={(e) => editNews(e.target.value, index)}>Sửa</button>

                                    <button className='btn btn-danger' value={item.id} onClick={(e) => deleteNews(e.target.value)} >Xóa</button>
                                    <br />
                                    <div style={{ display: "none" }} id={"formEdit" + index}>
                                        <Edit newById={newById} user={user} />
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

export default List;