import swal from "sweetalert";
import AxiosInstance from "../helper/AxiosIntance";
import React, { useState, useEffect } from "react";

const EditTopic = (props) => {
    const { topicById, setReload } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')


    useEffect(() => {
        const fetchData = () => {
            setName(topicById.name);
            setDescription(topicById.description);
        }
        fetchData();
    }, [props]);
    const handleUpdateTopic = async () => {
        try {
            if (!name || !description) {
                swal("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            const body = {
                name: name,
                description: description
            }
            const result = await AxiosInstance().post('/update-topics.php?id=' + topicById.id, body);
            swal(result.message)
            setReload(true)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <h1>Update</h1>
            <form>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <button onClick={handleUpdateTopic} type="button">Sửa</button>

            </form>
        </div>
    )
}

export default EditTopic;