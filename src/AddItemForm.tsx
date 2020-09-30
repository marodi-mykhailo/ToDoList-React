import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export  const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('Add item form')
        let [itemName, setItemName] = useState("")
        let [error, setError] = useState<string | null>(null)

        const onItemNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
            setItemName(e.currentTarget.value)
            setError(null)
        }
        const onAddItemKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null)
            }
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
                <TextField value={itemName}
                           onChange={onItemNameChanged}
                           onKeyPress={onAddItemKeyPressed}
                           label={"Insert text"}
                           error={!!error}
                           helperText={error}
                />
                <IconButton color={"primary"} onClick={addItem}>
                    <AddBox/>
                </IconButton>

            </div>
        )
    }
)

