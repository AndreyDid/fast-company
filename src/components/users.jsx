import React, {useId, useState} from "react";
import api  from "../api"
import {fetchAll} from "../api/fake.api/user.api";
import {queries} from "@testing-library/react";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll)
    const user = users.map((user) => user.name)
    const numberPeople = user.length

    const handleDelete = (userId) => {
        setUsers((user) => user.filter((u) => u !== userId))
    }

    const renderPhrase = (number) => {
        number = numberPeople
        let phrase = ''
        if (number > 4 || number === 1) {
            phrase = `${number} человек сегодня тусанет с тобой`
        } else {
            phrase = `${number} человека тусанут с тобой сегодня`
        } if (number === 0) {
            phrase = 'Никто с тобой не тусанет'
        }
        return phrase
    }

    const classesPhrase = () => {
        let classes = 'badge fs-1 m-1 '
        classes += numberPeople === 0 ? 'bg-danger' : 'bg-primary'
        return classes
    }

    const clearTable = () => {
        let classes = numberPeople !== 0 ? 'table' : 'd-none'
        return classes
    }

    const renderUser = () => {
        return users.map((user) => (
                <tr key={user._id}>
                    <td scope="row">{user.name}</td>
                    <td >
                        {user.qualities.map((q) => (
                            <div
                                key={q._id}
                                className={`${'badge rounded-pill bg-'}${q.color}`}
                            >
                                {q.name}
                            </div>
                            )
                        )}
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td>
                        <div
                            className='btn btn-danger'
                             onClick={() => handleDelete(user)}
                        >
                            Delete
                        </div>
                    </td>
                </tr>
        ))
    }

    return (
        <>
            <p className={classesPhrase()} >{renderPhrase()}</p>
            <table className={clearTable()}
            >
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {renderUser()}
                </tbody>
            </table>
        </>
    )
}

export default Users