// Imports
import { useState } from "react";

export function Note(props) {
    const [note, setNote] = useState(props.note);
    const [isEditing, setIsEditing] = useState(false);

    // Handler for editing edit function
    const handleEdit = () => {
        setNote(props.note);
        setIsEditing(true);
    }

    // Handler for saving edit function
    const handleSave = (event) => {
        event.preventDefault();

        fetch(props.note._links.self.href, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then((response) => {
                if(response.ok){
                    setIsEditing(false);
                    props.notesRefreshHandler();
                }
            })
    }

    const handleCancel = () => {
        setIsEditing(false);
    }

    const handleChange = (event) => {
        setNote({
            ...note,
            [event.target.name]: event.target.value
        })
    }

    // Delete functionality
    const deleteNote = () => {
        fetch(props.note._links.self.href, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => props.notesRefreshHandler())
    }

    return (
        <section>
            {isEditing ? (
                <form>
                    <input type="text" value={note.title} name="title" onChange={handleChange}/><br/>
                    <input type="text" value={note.body} name="body" onChange={handleChange}/><br/>
                    <input type="text"  value={note.author} name="author" onChange={handleChange}/><br/>
                    <button onClick={handleSave}>SAVE</button>
                    <button onClick={handleCancel}>CANCEL</button>
                </form>
            ) : (
                <>
                    <h2>{note.title}</h2>
                    <button onClick={handleEdit}>EDIT</button><br/>
                    <button onClick={deleteNote}>DELETE</button>
                </>
            )}
        </section>
    );
}
