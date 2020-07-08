import React, {useState} from 'react';
import {Link} from "react-router-dom";



function SideNav() {

  const tree = [
    {
      title: 'Beverages',
      id: 1,
      children: [
        { title: 'Coke', id: 2, value: '500ml bottle ASDA' },
        { title: 'Water', id: 3, value: '2L bottle Tesco'},
        { title: 'Fanta', id: 4, children: [
          {title: 'Fruit Twist', id: 5, value: 'small can ASDA'},
          {title: 'Orange', id: 6, value: 'can tesco'}
        ]}
      ]
    },
    {
      title: 'Todo',
      id: 7,
      children: [
        { title: 'Go shopping', id: 8, value: 'Apples, milk and bread.'},
        { title: 'Clean room', id: 9, value: 'Clean room.'}
      ]},
      {title: 'Books', id: 10, value: 'Maths'}
  ];
  //https://material-ui.com/components/tree-view/

    return (

      <div>
        
         <Tree tree={tree} level={0}/>
         
         
         &rsaquo;
         <br />
         &#9658;

         &#9656;
         &#9662;


      </div>

    )
    
}

// https://medium.com/@swatisucharita94/recursive-rendering-in-react-42666102eae2

const Tree = ({tree, level}) => {
  return (
    <TreeView level={level}>
    {
      tree.map(n => (
        <React.Fragment key={n.id}>
        <h2>{n.title}</h2>
        {n.children && <Tree tree={n.children} level={level+1}/>}
        </React.Fragment>
      ))
    }
    </TreeView>
  );
}

const TreeView = ({level, children}) => {

  // const [isOpen, setOpen] = useState(level == 0);
  
  return (
    <div style={{'marginLeft': `${level / 2}rem`}} /*className={isOpen ? "" : "hidden"} onClick={() => setOpen(!isOpen)}*/>
      {children}
    </div>
  )
}

export default SideNav;