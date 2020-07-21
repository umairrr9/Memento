import React from 'react';

function Temporary() {

    let tree = [
        {
            title: "Beverages",
            id: 1,
            children: [
                {
                    title: "Water", id: 2, noteId: 'a'
                },
                {
                    title: "Fanta Fruit Twist Fruit TwistFruit Twist",
                    id: 3,
                    children: [
                        { title: "Fruit Twist", id: 4, noteId: 'b' },
                        { title: "Orange", id: 5, noteId: 'c' },
                    ],
                },
            ],
        },
        {
            title: "Todo",
            id: 7,
            children: [
                { title: "Go shopping", id: 8, noteId: 'ab' },
                { title: "Clean room", id: 9, noteId: 'l' },
            ],
        },
    ];

    const notes = {
        'a': {
            "time": 1595268854961,
            "blocks": [
                {
                    "type": "header",
                    "data": {
                        "text": "Editor.js",
                        "level": 2
                    }
                },
            ]
        },

    }

    // given id, find note/folder in tree
    const findNoteOrFolder = (id, tree) => {
        if (!Array.isArray(tree)) tree = [tree];
        let answer = null;
        tree.map(t => {
            if (t.id === id) { 
                answer = t; 
                return; 
            };
            if (t.children) return findNoteOrFolder(id, t.children);
        });
        return answer;
    }

    // given id, add folder to list
    const addFolder = (id, initialTree, tree, folder) => {
        if (!Array.isArray(tree)) tree = [tree];
        tree.map(t => {
            if (t.id === id) { 
                t.children.push(folder); 
                return; 
            };
            if (t.children) return addFolder(id, initialTree, t.children, folder);
        });
        return initialTree;
    }

    // given noteId, find note in tree
    // const findNote = (noteId, tree) => {
    //     tree.map(t => {
    //         if (t.noteId === noteId) { console.log(t); return t};
    //     })
    // }

    let x = findNoteOrFolder(7, tree);//tree.map((t, i) => findNoteOrFolder(7, [t]))
    let y = addFolder()


    return (
        <>
            {
                // console.log(x)
                // console.log(a)
            }
            {
                console.log(x)
            }
        </>

    )
}

export default Temporary;