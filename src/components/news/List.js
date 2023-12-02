import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/AxiosIntance";
import Add from "./Add";
import Edit from "./Edit";
import swal from 'sweetalert';

const List = (props) => {
    const { user, saveUser } = props;
    const [news, setNews] = useState([])
    const [reload, setReload] = useState(false);

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
    news.sort((a, b) => b.id - a.id);

    return (
        <div>
            <ul>
                <li><a class="active" href="/">News</a></li>
                <li><a href="/list-topics">Topics</a></li>
                <li><a href="/thong-ke">Thống kê</a></li>
                <li><a href="#about">About</a></li>
                <li style={{ position: "absolute", top: 11, right: 100 }}><button onClick={() => saveUser(null)}>Đăng xuất</button></li>
            </ul>
            <Add user={user} setReload={setReload} />


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

                                    <button className='btn btn-primary' style={{ padding: 0, marginRight: 5 }}><Edit setReload={setReload} user={user} id={item.id} /></button>
                                    <button className='btn btn-danger' value={item.id} onClick={(e) => deleteNews(e.target.value)}>Xóa</button>

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