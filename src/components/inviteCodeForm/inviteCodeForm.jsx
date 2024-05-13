import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import "./inviteCodeForm.css"


const InviteCodeForm = ({create}) => {

    const [course, setCourse] = useState({inviteCode: ''})
    const [checkData, setCheckData] = useState(false)

    const addNewCourse = async (e) => {
        e.preventDefault()
        await create(course)
        setCourse({inviteCode: ''})
    }

    const checkIfValid = () => {
        for (const key in course) {
            if (course[key].length <= 1) {
                setCheckData(false)
                return;
            }
        }
        setCheckData(true)
    }

    useEffect(() => {
        checkIfValid()
    }, [course]);

    return (
        <form className="MyInput-form-for-invite-code">
            <div className="MyInput-header">Введите код приглашения</div>
            <MyInput
                style={(course.inviteCode !== "" && course.inviteCode.length < 5) ? {borderColor: "#EF3826"} : null}
                value={course.inviteCode}
                onChange={e => setCourse({...course, inviteCode: e.target.value})}
                type="text"
                placeholder="Код приглашения"
            />

            <button className="MyInput-button"
                    style={!checkData ? {background: "white", color: "#4880FF", border: "2px solid #4880FF"} : {}}
                    disabled={!checkData}
                    onClick={async (e
                    ) => addNewCourse(e)}>Отправить код
            </button>
        </form>
    );
};

export default InviteCodeForm;