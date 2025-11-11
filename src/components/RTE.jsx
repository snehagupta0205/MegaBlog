import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name,control,defaultvalue="", label}) {
    //Controller: From react-hook-form, it connects non-native form elements (like TinyMCE) with form state and validation.
  return (
    <div className='w-full'>
        {label &&<label className='inline-block mb-1 pl-1'>
            {label}</label>}
            <Controller
            name={name ||"content"}
            control={control}
            render={({field:{onChange}})=>(
                <Editor
                apiKey={import.meta.env.VITE_TINY_API_KEY}
                initialValue={defaultvalue}//the default text
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}//settings like toolbar buttons
                onEditorChange={onChange}//triggers when content changes
                />
                // render: Custom render function to define how the field should behave. It gets access to field props like onChange. Editor: The actual TinyMCE editor component.

// apiKey: Uses the API key from .env for cloud features.

// initialValue: Sets the default value (like existing content when editing).

// init: Configuration object for the editor:

// height: 500px.

// menubar: disabled.

// plugins: enables advanced features like lists, images, tables, etc.

// toolbar: defines which tools to show.

// content_style: styles for the editor content (font, size).

// onEditorChange: triggers form state updates when content changes.
            )}/>

    </div>
  )
}

export default RTE