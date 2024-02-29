import { useState, useMemo, useEffect } from "react";
import { api } from "@/api";
import React from "react";
import { Autocomplete, AutocompleteItem, Chip, Button } from "@nextui-org/react";
import Icon from "../Icon";

export default function App({ mode }) {
    const [query, setQuery] = useState('');
    const [list, setList] = useState([]);
    useMemo(() => {
        if (query.length) {
            fetch(api + "/tags?sort[0]=used:desc&filters[type][$eq]=" + mode + "&filters[text][$contains]=" + query)
                .then(response => response.json())
                .then(result => {
                    if (result.data.length) {
                        const tagsx = result.data;
                        setList([{ id: 0, attributes: { text: query, type: mode } }, ...tagsx]);
                    } else {
                        setList([{ id: 0, attributes: { text: query, type: mode } }])
                    }
                })
        }
    }, [query])
    const [tags, setTags] = useState([]);
    function addTag(tag) {
        const temp = [...tags, tag]
        setTags(temp);
    }
    function removeTag(tag) {
        const index = tags.indexOf(tag);
        const temp = [...tags];
        temp.splice(index, 1)
        setTags(temp);
    }
    return (
        <div className="flex flex-col gap-1">

            {(tags.length < 5) ? (<Autocomplete
                allowsCustomValue
                menuTrigger="input"
                onInputChange={(input) => setQuery(input)}
                onSelectionChange={(text) => addTag(text)}
                classNames={{
                    base: "border-none p-0",
                    listboxWrapper: "max-h-[320px]",
                    listbox: "flex flex-row flex-wrap",
                    selectorButton: "text-default-foreground",
                    clearButton: "text-default-foreground"
                }}
                inputProps={{
                    classNames: {
                        inputWrapper: "h-8 min-h-8"
                    }
                }}
                popoverProps={{
                    classNames: {
                        content: "bg-default-100/100"
                    }
                }}
                listboxProps={{
                    hideSelectedIcon: true,
                    classNames: {
                        list: "flex flex-row flex-wrap"
                    },
                    itemClasses: {
                        base: [
                            "w-fit"
                        ],
                    },
                }}
                defaultItems={list}
                aria-label="positive-tags"
                placeholder={(mode == 'positive') ? "راهنما" : "منفی"}
                radius="full"
                variant="flat"
                size="sm"

            >
                {(item) => (
                    <AutocompleteItem key={item.attributes.text}
                        textValue={item.attributes.text}>
                        <span className="text-small">{item.attributes.text}</span>
                    </AutocompleteItem>
                )}
            </Autocomplete>) : ""}
            <div className="flex gap-1 flex-wrap min-h-6">
                {tags.length ? tags.map((tag) => {
                    return (
                        <>
                            <Chip key={tag} className="text-xs p-0.5" color={(mode == "positive") ? "primary" : "danger"} onClick={() => removeTag(tag)}>{tag}</Chip>
                            <input type="hidden" name={mode} value={tag} />
                        </>
                    )
                })
                    : ''}
            </div>
        </div>
    );
}
