import AxiosInstance from "../helper/AxiosIntance";
import React, { useState } from "react";

const AddTopic = (props) => {
    const { setReload, setNotification } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')

    // const [topics, setTopics] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await AxiosInstance().get('/get-topics.php');
    //         setTopics(result);
    //     }
    //     fetchData();
    // }, []);

    const handleAddTopic = async () => {
        try {
            if (!name || !description) {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            const body = {
                name: name,
                description: description
            }
            const result = await AxiosInstance().post('/add-topics.php', body);
            if (result) {
                setReload(true);
                setNotification("Thêm mới topic thành công!");
                setTimeout(() => {
                    setNotification('');
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <h1>Add topic</h1>
            <form>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <button onClick={handleAddTopic} type="button">Thêm</button>

            </form>
        </div>
    )
}

export default AddTopic;