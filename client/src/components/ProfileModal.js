import React, { useState } from "react";
import Modal from "./Modal";
import useForm from "./useForm";

export default function ProfileModal({
    closeOnClick,
    showModal,
    modalTitle,
}) {

    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [oldPassword, setOldPassword] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const { values, handleChange, handleSubmit, setValue } = useForm(getErrors);
    const { email, currentPassword, newPassword, confirmPassword, username, currentPasswordError,  newPasswordError, confirmPasswordError } = values;
    const [error, setError] = useState(null);
    const [response, setResponse] = useState("");
    const passwordPattern = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$£%^&+=])(?=.*[a-z]).{8,}$');

    const [usernameSection, setUsernameSection] = useState(false);
    const [emailSection, setEmailSection] = useState(false);
    const [passwordSection, setPasswordSection] = useState(false);

    const changeInfo = () => {

    }

    function getErrors() {

        if (!currentPassword.match(passwordPattern)) {
            setValue("currentPasswordError", "The password should be at least 8 characters long and contain at least one uppercase, lowercase, number, and one special character.");
            setError(true);
            return;
        } else {
            setValue("currentPasswordError", "");
        }

        if (!newPassword.match(passwordPattern)) {
            setValue("newPasswordError", "The password should be at least 8 characters long and contain at least one uppercase, lowercase, number, and one special character.");
            setError(true);
            return;
        } else {
            setValue("newPasswordError", "");
        }

        if (newPassword !== confirmPassword) {
            setValue("confirmPasswordError", "The password's don't match, please try again");
            setError(true);
            return;
        } else {
            setValue("confirmPasswordError", "");
        }
    }
// className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    return (
        <Modal
            closeOnClick={closeOnClick}
            saveOnClick={handleSubmit}
            showModal={showModal}
            modalTitle={modalTitle}
        >
            <div
                className="relative py-2 px-6 flex-auto overflow-y-scroll"
                style={{ maxHeight: "20rem" }}
            >

                <div className="mb-6">
                    <h3 className="text-gray-500 font-lato text-md font-bold my-2">harrisuddin</h3>

                    <button
                        className="bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-md font-lato font-semibold hover:text-white p-2 mb-2 border border-brandBlue-A hover:border-transparent rounded"
                        onClick={() => {
                            setUsernameSection(!usernameSection)
                        }}>Change Username</button>
                </div>

                {usernameSection ? <div className="flex items-center justify-between my-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Change Username:</label>
                    </div>
                    <div className="ml-8">
                        <input name="username" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="new username" onChange={handleChange} />
                    </div>
                </div> : null}

                <div className="my-6">
                    <h3 className="text-gray-500 font-lato text-md font-bold my-2">uddin@example.com</h3>

                    <button
                        className="bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-md font-lato font-semibold hover:text-white p-2 mb-2 border border-brandBlue-A hover:border-transparent rounded"
                        onClick={() => {
                            setEmailSection(!emailSection)
                        }}>change email</button>
                </div>

                {emailSection ? <div className="flex items-center justify-between my-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Change Email:</label>
                    </div>
                    <div className="ml-8">
                        <input name="email" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="new email" onChange={handleChange} />
                    </div>
                </div> : null}

                <div className="my-6">
                    <h3 className="text-gray-500 font-lato text-md font-bold my-2">Password</h3>

                    <button
                        className="bg-transparent hover:bg-brandBlue-A text-brandBlue-A text-md font-lato font-semibold hover:text-white p-2 border border-brandBlue-A hover:border-transparent rounded"
                        onClick={() => {
                            setPasswordSection(!passwordSection)
                        }}>change password</button>
                </div>

                {passwordSection ? <div>

                    <div className="flex items-center justify-between my-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Current Password:</label>
                        </div>
                        <div className="ml-8">
                            <input name="currentPassword" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="current password" onChange={handleChange} />
                        </div>
                    </div>

                    {currentPasswordError ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{currentPasswordError}</p> : null}

                    <div className="flex items-center justify-between my-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
                        </div>
                        <div className="ml-8">
                            <input name="newPassword" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="new password" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between my-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password:</label>
                        </div>
                        <div className="ml-8">
                            <input name="confirmPassword" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="new password" onChange={handleChange} />
                        </div>
                    </div>

                </div> : null}

            </div>
        </Modal>
    )
}