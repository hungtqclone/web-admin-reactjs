import AxiosInstance from "../helper/AxiosIntance";
import React, { useState, useEffect, img } from "react";

const Edit = (props) => {
    const { user, newById, setReload } = props;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [topic_Id, setTopic_Id] = useState('');
    const [user_Id, setUser_Id] = useState(user?.ID);
    const imgloading = "https://www.icegif.com/wp-content/uploads/2023/07/icegif-1263.gif"
    const [imageInput, setImageInput] = useState('');
    const [imagePreview, setImagePreview] = useState('')
    const handleImageChange = async (e) => {
        //hiển thị hình ảnh
        const file = e.target.files[0];
        if (!file) return;
        setImagePreview(URL.createObjectURL(file));
        //upload hình ảnh
        const formData = new FormData();
        formData.append('image', file);
        const result = await AxiosInstance('multipart/form-data').post('/upload-file.php', formData);
        console.log(result);
        setImage(result.path);

    }

    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-topics.php');
            setTopics(result);
            setTitle(newById.title);
            setContent(newById.content);
            setImagePreview(newById.image);
            setImage(newById.image);
            setTopic_Id(newById.topic_id);
        }
        fetchData();
    }, [props]);
    const handleUpdateNews = async () => {
        try {
            if (!title || !content || !image) {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            const body = {
                title: title,
                content: content,
                image: image,
                topic_id: topic_Id,
                user_id: user_Id
            }
            const result = await AxiosInstance().post('/update-new.php?id=' + newById.id, body);
            alert(result.message)
            setReload(true)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <h1>Update</h1>
            <form>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} /><br />
                <input type="file" value={imageInput} onChange={handleImageChange} /><br />
                <img src={imagePreview ? imagePreview : imgloading} width={200} height={200} /><br />
                <select value={topic_Id} onChange={(e) => setTopic_Id(e.target.value)}>
                    {
                        topics.map((item, index) => (
                            <option value={item.id} key={index}>{item.name}</option>
                        ))
                    }
                </select>
                <br />
                <button onClick={handleUpdateNews} type="button">Sửa</button>

            </form>
        </div>
    )
}

export default Edit;