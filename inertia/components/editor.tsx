import React, { useEffect, useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
//@ts-ignore
import Embed from '@editorjs/embed'
//@ts-ignore
import Table from '@editorjs/table'
//@ts-ignore
import List from '@editorjs/list'
//@ts-ignore
import Paragraph from '@editorjs/paragraph'
//@ts-ignore
import Warning from '@editorjs/warning'
//@ts-ignore
import Code from '@editorjs/code'
//@ts-ignore
import LinkTool from '@editorjs/link'
//@ts-ignore
import Image from '@editorjs/image'
//@ts-ignore
import Raw from '@editorjs/raw'
//@ts-ignore
import Header from '@editorjs/header'
//@ts-ignore
import Quote from '@editorjs/quote'
//@ts-ignore
import Marker from '@editorjs/marker'
//@ts-ignore
import CheckList from '@editorjs/checklist'
//@ts-ignore
import Delimiter from '@editorjs/delimiter'
//@ts-ignore
import InlineCode from '@editorjs/inline-code'
//@ts-ignore
import SimpleImage from '@editorjs/simple-image'

interface EditorProps {
  data?: OutputData
  onChange?: (data: OutputData) => void
  holder: string
}

const Editor: React.FC<EditorProps> = ({ data, onChange, holder }) => {
  const editorRef = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: {
          embed: Embed,
          table: Table,
          list: List,
          warning: Warning,
          code: Code,
          linkTool: LinkTool,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: 'http://localhost:3001/uploadFile', // endpoint pour l'upload
                byUrl: 'http://localhost:3001/fetchUrl', // endpoint pour les URLs
              },
              // Alternative: utiliser un uploader personnalisé
              uploader: {
                uploadByFile(file: File) {
                  console.log(file)
                  // Votre logique d'upload ici
                  return new Promise((resolve, reject) => {
                    // Simuler un upload réussi pour le moment
                    setTimeout(() => {
                      resolve({
                        success: 1,
                        file: {
                          url: URL.createObjectURL(file), // URL locale temporaire
                        },
                      })
                    }, 1000)
                  })
                },
                uploadByUrl(url: string) {
                  console.log(url)
                  return new Promise((resolve) => {
                    resolve({
                      success: 1,
                      file: {
                        url: url,
                      },
                    })
                  })
                },
              },
            },
          },
          raw: Raw,
          header: Header,
          quote: Quote,
          marker: Marker,
          checklist: CheckList,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          simpleImage: SimpleImage,
          paragraph: Paragraph,
        },
        data: data || { blocks: [] },
        async onChange(api) {
          const content = await api.saver.save()
          onChange?.(content)
        },
        placeholder: 'Commencez à écrire votre contenu...',
      })

      editorRef.current = editor
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
      }
    }
  }, [])

  return <div id={holder} />
}

export default Editor
