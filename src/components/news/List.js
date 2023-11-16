import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/AxiosIntance";



const List = () => {
    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-new.php');
            setNews(result);
        }
        fetchData();
    }, []);
    return (
        <div>
            <h1>list</h1>
            <a href="/add">Add</a>
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
                                    <button className='btn btn-primary'>Sửa</button>
                                    <button className='btn btn-danger'>Xóa</button>
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