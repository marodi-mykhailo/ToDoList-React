import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    let [itemName, setItemName] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onItemNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setItemName(e.currentTarget.value)
        setError(null)
    }
    const onAddItemKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    const addItem = () => {
        if (itemName.trim()) {
            props.addItem(itemName.trim());
            setItemName("");
        } else {
            setError('Title is required');
        }

    }
    return (
        <div>
            <input value={itemName}
                   onChange={onItemNameChanged}
                   onKeyPress={onAddItemKeyPressed}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}

        </div>
    )
}

export default AddItemForm;
