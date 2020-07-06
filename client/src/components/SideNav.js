import React from 'react';

import {Link} from "react-router-dom";

const tree = [
  {
    title: 'Beverages',
    children: [
      { title: 'Coke', value: '500ml bottle ASDA' },
      { title: 'Water', value: '2L bottle Tesco'},
      { title: 'Fanta', children: [
        {title: 'Fruit Twist', value: 'small can ASDA'},
        {title: 'Orange', value: 'can tesco'}
      ]}
    ]
  },
  {title: 'Todo', value: 'go shoppin'}
];

function traverse(tree) {
  tree.forEach(n => {
    console.log(n.title);
    if (n.children) {
      traverse(n.children);
    } else {
      console.log(n.value);
    }
  });
}

// var traverse = function(tree, current) {
//   //process current node here

//   //visit children of current
//   for (var cki in current.out) {
//       var ck = current.out[cki];
//       var child = tree[ck];
//       traverse(tree, child);
//   }
// }



function SideNav() {

  

    return (

    // <TreeView className="fixed w-56 h-full bg-gray-100 py-8 px-2 text-5xl"
    //   defaultCollapseIcon={<ExpandMoreIcon />}
    //   defaultExpandIcon={<ChevronRightIcon />}
    // >
    // <TreeItem nodeId="1" label="Shopping List" />
    //   <TreeItem nodeId="2" label="Maths Notes">
    //     <TreeItem nodeId="3" label="Algebra" />
    //     <TreeItem nodeId="4" label="Graphs">
    //     <TreeItem nodeId="5" label="Basic" />
    //     <TreeItem nodeId="6" label="Advanced" />
    //     </TreeItem>
    //     <TreeItem nodeId="7" label="Set Theory" />
    //   </TreeItem>
    //   <TreeItem nodeId="8" label="Travel List" />
    //   <TreeItem nodeId="9" label="Home Ideas" />
    // </TreeView>

      <div>
        
        {traverse(tree)}

      </div>

    )
    
}

export default SideNav;