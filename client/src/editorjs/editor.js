import React from 'react';
import EditorJs from '@natterstefan/react-editor-js';

const Editor = () => {
  const editor = null

  const onReady = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log('Editor.js is ready to work!')
  }

  const onChange = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Now I know that Editor's content changed!")
  }

  const onSave = async () => {
    // https://editorjs.io/saving-data
    try {
      const outputData = await editor.save()
      console.log('Article data: ', outputData)
    } catch (e) {
      console.log('Saving failed: ', e)
    }
  }

  return (
    <div>
      <button onClick={onSave}>Save</button>
      {/* docs: https://editorjs.io/configuration */}
      <EditorJs
        data={data}
        // will be `editorjs` by default
        holder="custom-editor-container"
        onReady={onReady}
        onChange={onChange}
        editorInstance={editorInstance => {
          // invoked once the editorInstance is ready
          editor = editorInstance
        }}
      >
        <div id="custom-editor-container" />
      </EditorJs>
    </div>
  )
}

export default Editor;