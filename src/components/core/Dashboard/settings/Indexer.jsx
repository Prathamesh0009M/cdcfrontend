import React, { useState } from 'react';
import ChangeDp from "./ChangeDp";
import Setting from './Setting';
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteAccount } from '../../../../services/operations/authApi';
import { useSelector } from 'react-redux';

const Indexer = () => {
    const navigate = useNavigate();
    const [confirmationModal, setconfirmationModal] = useState(null);

    const { token } = useSelector((state) => state.profile);

    const handleChangePassword = () => {
        navigate("/forgot-password");
    };



    const handleDelete = async () => {
        const response = await deleteAccount(token, navigate);
        setconfirmationModal(null);

    };

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-8">
            <ChangeDp />
            <Setting />

            <div className="border-white">
                <p className="text-pink-300 text-2xl">
                    "2 Step Change Password Process"
                </p>

                <IconBtn
                    onclick={() => handleChangePassword()}
                    text={'Change Password'}
                    customClasses={'bg-green-400'}
                />
            </div>

            <div className="border-white mt-8">
                <p className="text-red-500 text-xl">
                    Warning: Deleting cannot be undone.
                </p>

                <IconBtn
                    onclick={() =>
                        setconfirmationModal({
                            text1: "Are you Sure?",
                            text2: "Your Account will be deleted permanantly",
                            btn1Text: "Delete Account",
                            btn2Text: "Cancel",
                            btn1Handler: handleDelete,
                            btn2Handler: () => setconfirmationModal(null),
                        })
                    }

                    text={'Delete'}
                    customClasses={'bg-red-500 text-white'}
                />
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default Indexer;
