import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import "./inviteCodeForm.css"


const InviteCodeForm = ({join, isLoading}) => {

    const [inviteCode, setInviteCode] = useState("")
    const [checkData, setCheckData] = useState(false)

    const addNewCourse = async (e) => {
        e.preventDefault()
        await join(inviteCode)
        setInviteCode("")
    }

    const checkIfValid = () => {
        if (inviteCode.length <= 5) {
            setCheckData(false)
            return;
        }
        setCheckData(true)
    }

    useEffect(() => {
        checkIfValid()
    }, [inviteCode]);

    return (
        <form className="MyInput-form-for-invite-code">
            <div className="MyInput-header">Введите код приглашения</div>
            <MyInput
                style={(inviteCode !== "" && inviteCode.length < 5) ? {borderColor: "#EF3826"} : null}
                value={inviteCode}
                onChange={e => setInviteCode(e.target.value)}
                type="text"
                placeholder="Код приглашения"
            />

            <button className="MyInput-button"
                    style={!checkData || isLoading ? {background: "white", color: "#4880FF", border: "2px solid #4880FF"} : {}}
                    disabled={!checkData || isLoading}
                    onClick={async (e
                    ) => addNewCourse(e)}>{isLoading? "Загрузка..." : "Присоединиться"}
            </button>
        </form>
    );
};

export default InviteCodeForm;