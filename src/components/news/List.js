import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/AxiosIntance";
import Add from "./Add";
import Edit from "./Edit";
import swal from 'sweetalert';
import Swal from 'react-sweetalert2';

const List = (props) => {
    const { user, saveUser } = props;
    const [news, setNews] = useState([])
    const [reload, setReload] = useState(false);
    const [newById, setNewById] = useState([]);
    const [formAdd, setFormAdd] = useState("none");
    const [formEdit, setFormEdit] = useState("none")
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-new.php');

            setNews(result);
        }
        fetchData();
        setReload(false)
    }, [reload]);

    const deleteNews = async (newsId) => {

        swal({
            title: "Xác nhận xóa?",
            text: "Xóa 1 tin tức",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const result = await AxiosInstance().get('/delete-new.php?id=' + newsId);
                    if (result.status) {
                        swal("Xóa thành công!");
                        setReload(true);
                    } else {
                        swal("Xóa thất bại!");
                    }

                } else {

                }
            });


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
    const testEditNews = async () => {
        console.log("open edit news");
        swal.withForm({
            title: 'Cool Swal-Forms example',
            text: 'Any text that you consider useful for the form',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Get form data!',
            closeOnConfirm: true,
            formFields: [
                { id: 'name', placeholder: 'Name Field', required: true },
                { id: 'nickname', placeholder: 'Add a cool nickname' }
            ]
        }, function (isConfirm) {
            // do whatever you want with the form data
            console.log(this.swalForm) // { name: 'user name', nickname: 'what the user sends' }
        })

    }
    return (
        <div>
            <ul>
                <li><a class="active" href="/">News</a></li>
                <li><a href="/list-topics">Topics</a></li>
                <li><a href="/thong-ke">Thống kê</a></li>
                <li><a href="#about">About</a></li>
                <li style={{ position: "absolute", top: 11, right: 100 }}><button onClick={() => saveUser(null)}>Đăng xuất</button></li>
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

                                    <button className='btn btn-primary' value={item.id} onClick={(e) => testEditNews()}>Sửa</button>

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